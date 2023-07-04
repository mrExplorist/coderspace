import React, { useEffect, useState } from "react";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { BsArrowLeft } from "react-icons/bs";
import { IoMdMicOff } from "react-icons/io";
import { FaHandPeace, FaHandSparkles } from "react-icons/fa";
import styles from "./Room.module.css";
import { getRoom } from "../../http";
import MicAnimation from "./MicAnimation";

const Room = () => {
  const { id: roomId } = useParams();
  const { user } = useSelector((state) => state.auth); //taking user from global state

  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [isMuted, setMuted] = useState(true);

  useEffect(() => {
    handleMute(isMuted, user.id);
  }, [isMuted]);

  const handleMuteClick = (clientId) => {
    if (clientId !== user.id) return;
    setMuted((isMuted) => !isMuted);
    // console.log("mute clicked", clientId);
  };

  const handleManualLeave = () => {
    navigate("/rooms");
  };

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      console.log(data);
      setRoom((prev) => data); // setting room data to state
    };
    fetchRoom();
  }, [roomId]);

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
          {/* will render topic dynamically fetch from room info */}
          <h2 className={styles.topic}>{room?.topic}</h2>
          <div className={styles.actions}>
            <button>
              <FaHandSparkles color="yellow" fontSize={26} />
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
              <div className={styles.client} key={client.id}>
                <div className={styles.userHead}>
                  <audio
                    ref={(instance) => provideRef(instance, client.id)} //ref attribute is used to create a reference to the rendered <audio> element. This reference can then be used to interact with or manipulate the <audio> element programmatically.
                    // controls
                    autoPlay
                  ></audio>
                  <img
                    className={styles.avatar}
                    src={client.avatar}
                    alt="avatar"
                  />
                  <button
                    onClick={() => handleMuteClick(client.id)}
                    className={styles.micbtn}
                  >
                    {client.muted ? (
                      <IoMdMicOff color="#fff" fontSize={22} />
                    ) : (
                      // <BsFillMicFill color="#fff" fontSize={22} />
                      <div className={styles.micAnimation}>
                        <MicAnimation />
                      </div>
                    )}
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
