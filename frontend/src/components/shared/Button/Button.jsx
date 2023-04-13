import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, icon, onClick }) => {
  return (
    <button onClick={onClick} className={styles.btn}>
      <span>{text}</span>
      {icon}
    </button>
  );
};

export default Button;
