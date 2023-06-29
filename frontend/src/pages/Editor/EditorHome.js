import React, { useState } from "react";
import Card from "../../components/shared/Card/Card";
import { TbBinaryTree } from "react-icons/tb";
import styles from "./EditorHome.module.css";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdScreenShare } from "react-icons/md";

const EditorHome = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [userName, setUserName] = useState(user?.name);
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    if (userName && roomId) {
      toast.success("Created a new room");
    }
  };

  const joinRoom = () => {
    if (!roomId || !userName) {
      toast.error("Please enter the room id and username");
      return;
    }
    // Redirect

    navigate(`/editor/${roomId}`, { state: { userName } });
  };

  return (
    <div className={styles.mainWrapper}>
      <Card className={styles.cardContainer}>
        <div className={styles.syncLogo}>
          <MdScreenShare fontSize={52} color="#487" />
        </div>

        <div className={styles.right}>
          <span className={styles.heading}>Code Sync</span>
          <h3 className={styles.subHeading}>Real-time Collaboration</h3>
        </div>

        <h4 className={styles.mainLabel}>Paste invitation ROOM ID</h4>
        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.inputBox}
            placeholder="ROOM ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                joinRoom();
              }
            }}
          />
          <input
            type="text"
            className={styles.inputBox}
            placeholder="USERNAME"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                joinRoom();
              }
            }}
          />
        </div>
        <button onClick={joinRoom} className={styles.joinBtn}>
          Join Room
        </button>

        <span className={styles.createInfo}>
          If you don't have an invite then create &nbsp;
          <a onClick={createNewRoom} href="" className={styles.createNewBtn}>
            new Room
          </a>
        </span>
      </Card>
      <footer>
        <h3>
          Powered by {"  "}
          <a href="https://github.com/mrexplorist/coderspace">Coderspaces</a>
        </h3>
      </footer>
    </div>
  );
};

export default EditorHome;
