import React from "react";
import styles from "./StepAvatar.module.css";

const StepAvatar = ({ onNext }) => {
  return (
    <>
      <div>
        <h1>Avatar Component</h1>
        <button onClick={onNext}>Next</button>
      </div>
    </>
  );
};

export default StepAvatar;
