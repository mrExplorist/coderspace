import React from "react";
import styles from "./Rooms.module.css";
import { MdSpatialAudioOff } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
const Rooms = () => {
  return (
    <>
      <div className="container">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All voice rooms</span>
            <div className={styles.searchBox}>
              <BiSearchAlt2 fontSize="24px" />
              <input type="text" className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.right}>
            <button className={styles.startRoomButton}>
              <MdSpatialAudioOff color="#fff" fontSize="22px" />
              <span>Start a room</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;
