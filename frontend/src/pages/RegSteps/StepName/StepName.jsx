import React from "react";
import styles from "./StepName.module.css";

const StepName = ({ onNext }) => {
  return (
    <>
      <div>
        <h1>Name Component</h1>
        <button onClick={onNext}>Next</button>
      </div>
    </>
  );
};

export default StepName;
