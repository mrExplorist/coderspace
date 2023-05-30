import React from "react";
import styles from "./StepUserName.module.css";

const StepUserName = ({ onNext }) => {
  return (
    <>
      <div>
        <h1>UserName Component</h1>
        <button onClick={onNext}>Next</button>
      </div>
    </>
  );
};

export default StepUserName;
 