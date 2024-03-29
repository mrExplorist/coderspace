import React from "react";
import { toast } from "react-hot-toast";
import { MdScreenShare } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Client from "../../../components/Client/Client";
import Editor from "../../../components/Editor/Editor";
import { useWebRTC } from "../../../hooks/useWebRTC";
import styles from "./EditorPage.module.css";

const EditorPage = () => {
  const { id: roomId } = useParams();

  // const location = useLocation();
  const reactNavigator = useNavigate();

  const { user } = useSelector(state => state.auth); //taking user from global state

  const { clients, socket, codeRef } = useWebRTC(roomId, user);

  // const socketRef = useRef();
  // useEffect(() => {
  //   const init = async () => {
  //     socketRef.current = await socketInit();
  //     socketRef.current.on("connect_error", (err) => handleErrors(err));
  //     socketRef.current.on("connect_failed", (err) => handleErrors(err));
  //     console.log(socketRef.current);

  //     function handleErrors(e) {
  //       console.log("socket error", e);
  //       toast.error("Socket connection failed, try again later.");
  //       reactNavigator("/");
  //     }

  //     socketRef.current.emit(ACTIONS.JOIN, {
  //       roomId,
  //       user: location.state?.username,
  //     });
  //   };

  //   init();
  // }, []);
  // if (!location.state) {
  //   return <Navigate to="/" />;
  // }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("ROOM ID copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy ROOM ID");
      console.log(error);
    }
  };

  const leaveRoom = () => {
    reactNavigator("/");
  };

  return (
    <div className={styles.mainWrap}>
      <div className={styles.aside}>
        <div className={styles.asideInner}>
          <div className={styles.syncLogo}>
            <MdScreenShare fontSize={52} color="#487" />
          </div>
          <h3>Connected</h3>
          <div className={styles.clientsList}>
            {clients.map(client => (
              <Client key={client.socketId} username={client.name} />
            ))}
          </div>
        </div>
        <button className={styles.copyBtn} onClick={copyRoomId}>
          Copy ROOM ID
        </button>
        <button className={styles.leaveBtn} onClick={leaveRoom}>
          Leave
        </button>
      </div>
      <div className={styles.editorWrap}>
        <Editor
          socketRef={socket}
          roomId={roomId}
          onCodeChange={code => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
