import React, { useState } from "react";

import Email from "./Email/Email";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import Phone from "./Phone/Phone";
import styles from "./StepPhoneEmail.module.css";

// Taking onClick reference method coming from the register parent component

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const AuthComponent = phoneEmailMap[type];

  // function onNext() {}

  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.buttonWrap}>
            <button
              className={`${styles.tabButton} ${
                type === "phone" ? styles.active : ""
              }`}
              onClick={() => setType("phone")}
            >
              <MdOutlinePhoneAndroid fontSize="30px" color="white" />
            </button>
            <button
              className={`${styles.tabButton} ${
                type === "email" ? styles.active : ""
              }`}
              onClick={() => setType("email")}
            >
              <HiOutlineMail fontSize="35px" color="white" />
            </button>
          </div>
          <AuthComponent onNext={onNext} />
        </div>
      </div>
    </>
  );
};

export default StepPhoneEmail;
