import React from "react";
import styles from "./StepOtp.module.css";

const StepOtp = ({ onNext }) => {
  return (
    <>
      <div>
        <h1>Otp Component</h1>
        <button onClick={onNext}>Next</button>
      </div>
    </>
  );
};

export default StepOtp;
