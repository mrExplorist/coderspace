import { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallback } from "./useStateWithCallback";

import { socketInit } from "../socket";
import { ACTIONS } from "../actions";
import freeice from "freeice";
// const users = [
//   {
//     id: 1,
//     name: "Ritesh Agarawal",
//   },
//   {
//     id: 2,
//     name: "Summit Shah",
//   },
// ];

export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);

  const audioElements = useRef({});
  // For Capturing media
  const [audioStream, setAudioStream] = useState(null);

  // to store all the peer connections we need a reference

  const connections = useRef({
    // socketId: connection
  });

  const localMediaStream = useRef(null);

  const socket = useRef(null);
  useEffect(() => {
    socket.current = socketInit();
  }, []);

  const addNewClient = useCallback(
    (newClient, cb) => {
      // checking if client already exists or not
      const lookingFor = clients.find((client) => client.id === newClient.id);

      // if not exists then add clients
      if (lookingFor === undefined) {
        setClients((existingClients) => [...existingClients, newClient], cb);
      }
    },
    [clients, setClients]
  );

  useEffect(() => {
    const getMicrophoneStream = async () => {
      try {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        setAudioStream(localMediaStream);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    getMicrophoneStream().then(() => {
      // adding user in client list
      addNewClient(user, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }

        // emitting a `JOIN` event from the frontend  to the server using the `socket.current` connection, passing the `roomId` and `user` data.

        socket.current.emit(ACTIONS.JOIN, { roomId, user });
      });
    });

    // Leaving the room
    return () => {
      if (localMediaStream) {
        localMediaStream.current.getTracks().forEach((track) => track.stop());
        socket.current.emit(ACTIONS.LEAVE, { roomId });
      }
    };

    // return () => {
    //   isMounted = false;
    //   if (audioStream) {
    //     audioStream.getTracks().forEach((track) => {
    //       track.stop();
    //     });
    //   }
    // };
  }, []);

  // LIstening to add peer emit from the server to the client

  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      // if already connected then give warning

      if (peerId in connections.current) {
        //  connections = {
        //   socketId: connection
        // }

        return console.warn(
          `You are already connected with the ${peerId} (${user.name})`
        );
      }

      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice(),
      });

      // Handle new ice candidate

      connections.current[peerId].onicecandidate = (event) => {
        socket.current.emit(ACTIONS.RELAY_ICE, {
          peerId,
          icecandidate: event.candidate,
        });
      };

      // Handle on track on this connection
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClient(remoteUser, () => {
          if (audioElements.current[remoteUser.id]) {
            audioElements.current[remoteUser.id].srcObject = remoteStream;
          } else {
            let settled = false;
            const interval = setInterval(() => {
              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                settled = true;
              }

              if (settled) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };

      // add local track to remote connections

      localMediaStream.current.getTracks().forEach((track) => {
        connections.current[peerId].addTrack(track, localMediaStream.current);
      });

      //Create offer
      if (createOffer) {
        const offer = await connections.current[peerId].createOffer();
        // Set as local description
        await connections.current[peerId].setLocalDescription(offer);
        //send offer to another client
        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        });
      }
    };
    // Listen for add peer event from ws
    socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

    // cleaning fn to avoid memory leaks
    return () => {
      socket.current.off(ACTIONS.ADD_PEER);
    };
  }, []);

  // Handle ice candidate

  useEffect(() => {
    socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
      if (icecandidate) {
        connections.current[peerId].addIceCandidate(icecandidate);
      }
    });

    return () => {
      socket.current.off(ACTIONS.ICE_CANDIDATE);
    };
  }, []);

  // Handle session description

  useEffect(() => {
    const setRemoteMedia = async ({
      peerId,
      sessionDescription: remoteSessionDescription,
    }) => {
      connections.current[peerId].setRemoteDescription(
        new RTCSessionDescription(remoteSessionDescription)
      );

      // if session description is type of offer then create an answer

      if (remoteSessionDescription.type === "offer") {
        const connection = connections.current[peerId];

        // creating answer on connection
        const answer = await connection.createAnswer();

        connection.setLocalDescription(answer);

        // sending answer to different client
        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: answer,
        });
      }
    };

    socket.current.on(
      ACTIONS.SESSION_DESCRIPTION,

      setRemoteMedia
    );

    // cleaning functions when leaving component

    return () => {
      socket.current.off(ACTIONS.SESSION_DESCRIPTION);
    };
  }, []);

  // Handle remove peer

  useEffect(() => {
    const handleRemovePeer = async ({ peerId, userId }) => {
      if (connections.current[peerId]) {
        connections.current[peerId].close();
      }

      // deleting connection from connection object

      delete connections.current[peerId];
      delete audioElements.current[peerId];

      //removing client from list of clients in setState
      setClients((list) => list.filter((client) => client.id !== userId));
    };
    socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
    return () => {
      socket.current.off(ACTIONS.REMOVE_PEER);
    };
  }, []);

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  return { clients, provideRef };
};
