import React, { useState } from "react";

import styles from "./AddRoomModal.module.css";
import { FcConferenceCall, FcGlobe, FcLock, FcPrivacy } from "react-icons/fc";
import { GiFireworkRocket } from "react-icons/gi";

import { IoMdClose } from "react-icons/io";
import { MdRocketLaunch } from "react-icons/md";

import TextInput from "../../shared/TextInput/TextInput";
import { createRoom as create } from "../../../http";

const AddRoomModal = ({ onClose }) => {
  const [roomType, setRoomType] = useState("open");

  const [topic, setTopic] = useState("");

  // creating Room create function
  async function createRoom() {
    // server call

    try {
      if (!topic) return;
      const { data } = await create({ topic, roomType });
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeModalButton}>
          <IoMdClose fontSize={22} />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be discussed</h3>

          <TextInput
            fullwidth="true"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <h2>Room types</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
            >
              <FcGlobe fontSize={40} /> <span>Open</span>
            </div>
            <div
              onClick={() => setRoomType("social")}
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
            >
              <FcConferenceCall fontSize={40} /> <span>Social</span>
            </div>
            <div
              onClick={() => setRoomType("private")}
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
            >
              <FcPrivacy fontSize={40} /> <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room open to everyone</h2>
          <button onClick={createRoom}>
            <MdRocketLaunch color="yellow" fontSize={26} />
            <span>Let's go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
