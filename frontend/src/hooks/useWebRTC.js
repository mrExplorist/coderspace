import { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallback } from "./useStateWithCallback";

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
  const connections = useRef({
    // socketId: connection
  });
  const localMediaStream = useRef(null);

  const addNewClients = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client.id === newClient.id);

      if (lookingFor === undefined) {
        setClients((existingClients) => [...existingClients, newClient], cb);
      }
    },
    [clients, setClients]
  );

  useEffect(() => {
    let isMounted = true;

    const getMicrophoneStream = async () => {
      try {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        if (isMounted) {
          setAudioStream(localMediaStream);
        }
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    getMicrophoneStream().then(() => {
      addNewClients(user, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }
      });
    });

    // return () => {
    //   isMounted = false;
    //   if (audioStream) {
    //     audioStream.getTracks().forEach((track) => {
    //       track.stop();
    //     });
    //   }
    // };
  }, []);

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  return { clients, provideRef };
};
