import React from "react";
import styles from "./StepPhoneEmail.module.css";

// Taking onClick reference method coming from the register parent component

const StepPhoneEmail = ({ onNext }) => {
  return (
    <>
      <div>
        <h1>Phone or Email Component</h1>
        <button onClick={onNext}>Next</button>
      </div>
    </>
  );
};

export default StepPhoneEmail;
