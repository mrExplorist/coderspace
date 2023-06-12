import React from "react";
import styles from "./RoomCard.module.css";

import { BsPeopleFill } from "react-icons/bs";
import { HiChat } from "react-icons/hi";

import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/room/${room.id}`);
      }}
      className={styles.card}
    >
      <h3 className={styles.topic}>{room.topic}</h3>

      <div className={styles.speakers}>
        <div className={styles.avatars}>
          {room.speakers.map((speaker) => (
            <img key={speaker.id} src={speaker.avatar} alt="speaker-avatar" />
          ))}
        </div>
        <div className={styles.names}>
          {room.speakers.map((speaker) => (
            <div key={speaker.id} className={styles.nameWrapper}>
              <span>{speaker.name}</span>
              <HiChat />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.peopleCount}>
        <span>{room.totalParticipants}</span>
        <BsPeopleFill />
      </div>
    </div>
  );
};

export default RoomCard;
