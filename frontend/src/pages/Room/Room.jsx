import React, { useState } from "react";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { BsArrowLeft } from "react-icons/bs";
import { IoMdMicOff } from "react-icons/io";
import { FaHandPeace, FaHandSparkles } from "react-icons/fa";
import styles from "./Room.module.css";
const Room = () => {
  const { id: roomId } = useParams();
  const { user } = useSelector((state) => state.auth); //taking user from global state

  const { clients, provideRef } = useWebRTC(roomId, user);

  const navigate = useNavigate();

  const handleManualLeave = () => {
    navigate("/rooms");
  };
  return (
    <div>
      <div className="container">
        <button className={styles.goBack} onClick={handleManualLeave}>
          <BsArrowLeft fontSize={18} />

          <span> All voice rooms</span>
        </button>
      </div>
      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          <h2 className={styles.topic}>Boost Investment Portfolio</h2>
          <div className={styles.actions}>
            <button>
              <FaHandSparkles color="yellow" fontSize={24} />
            </button>
            <button onClick={handleManualLeave}>
              <FaHandPeace color="#F2BC1D" fontSize={22} />
              <span>Leave quietly</span>
            </button>
          </div>
        </div>
        <div className={styles.clientsList}>
          {clients.map((client) => {
            return (
              <div className={styles.client}>
                <div className={styles.userHead} key={client.id}>
                  <audio
                    ref={(instance) => provideRef(instance, client.id)} //ref attribute is used to create a reference to the rendered <audio> element. This reference can then be used to interact with or manipulate the <audio> element programmatically.
                    // controls
                    // autoPlay
                  ></audio>
                  <img
                    className={styles.avatar}
                    src={client.avatar}
                    alt="avatar"
                  />
                  <button className={styles.micbtn}>
                    {/* <BsFillMicFill color="#fff" fontSize={18} /> */}
                    <IoMdMicOff color="#fff" fontSize={22} />
                  </button>
                  <h4>{client.name}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Room;
