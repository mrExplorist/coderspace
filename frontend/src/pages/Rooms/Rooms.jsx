import React, { useEffect, useState } from "react";
import styles from "./Rooms.module.css";
import { MdSpatialAudioOff } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import RoomCard from "../../components/RoomCard/RoomCard";
import AddRoomModal from "../../components/Modals/AddRoomModal/AddRoomModal";
import { getAllRooms } from "../../http";
import { TbSourceCode } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

// const rooms = [
//   {
//     id: 1,
//     topic:
//       "CampusBuddy provides a platform for students to create and join communities centred around interests or extracurricular activities? ",
//     speakers: [
//       {
//         id: 1,
//         name: "Sam Altman",
//         avatar: "/images/avatar.png",
//       },
//       {
//         id: 2,
//         name: "Elon Musk",
//         avatar: "/images/avatar.png",
//       },
//       {
//         id: 3,
//         name: "Ritesh Agrawal",
//         avatar: "/images/avatar.png",
//       },
//     ],

//     totalParticipants: 40,
//   },
//   {
//     id: 2,
//     topic: "What's new in Machine Learning ? ",
//     speakers: [
//       {
//         id: 1,
//         name: "Speaker 3",
//         avatar: "/images/avatar.png",
//       },
//       {
//         id: 2,
//         name: "Speaker 3",
//         avatar: "/images/avatar.png",
//       },
//       {
//         id: 3,
//         name: "Speaker 3",
//         avatar: "/images/avatar.png",
//       },
//     ],
//     totalParticipants: 50,
//   },
//   {
//     id: 3,
//     topic: "Ongoing recession and layoffs in the tech industry?",
//     speakers: [
//       {
//         id: 1,
//         name: "Speaker 1",
//         avatar: "/images/avatar.png",
//       },
//       {
//         id: 2,
//         name: "Speaker 2",
//         avatar: "/images/avatar.png",
//       },
//       {
//         id: 3,
//         name: "Speaker 3",
//         avatar: "/images/avatar.png",
//       },
//     ],
//     totalParticipants: 35,
//   },
//   // Add more rooms here...
//   {
//     id: 4,
//     topic: "Threats of GPT'S ?",
//     speakers: [
//       {
//         id: 1,
//         name: "Speaker 1",
//         avatar: "/images/avatar.png",
//       },
//       {
//         id: 2,
//         name: "Speaker 2",
//         avatar: "/images/avatar.png",
//       },
//       {
//         id: 3,
//         name: "Speaker 3",
//         avatar: "/images/avatar.png",
//       },
//     ],
//     totalParticipants: 35,
//   },
// ];

const Rooms = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);

  // fetching all rooms from the database
  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      setRooms(data);
    };

    fetchRooms();
  }, []);

  function openModal() {
    setShowModal(true);
  }

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
            <button className={styles.startRoomButton} onClick={openModal}>
              <MdSpatialAudioOff color="#fff" fontSize="22px" />
              <span>Start a room</span>
            </button>

            <button
              className={styles.codeEditorButton}
              onClick={() => navigate(`/editor`)}
            >
              <TbSourceCode color="#fff" fontSize={22} />
              <span>CodeSync</span>
            </button>
          </div>
        </div>

        <div className={styles.roomList}>
          {/* List of rooms will be fetched from the backend */}

          {/* For the time being we will use dummy data */}

          {rooms.map((room) => (
            <>
              <RoomCard key={room.id} room={room} />
            </>
          ))}
        </div>
      </div>
      {showModal && <AddRoomModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Rooms;
