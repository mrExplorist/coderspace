import React from "react";
import Card from "../Card/Card";

import Lottie from "react-lottie-player";
import styles from "./Loader.module.css";

import * as loading from "../../../loading2.json";

// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: loading.default,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice",
//   },
// };
const Loader = ({ message }) => {
  return (
    <div className="cardWrapper">
      <Card>
        <Lottie
          loop
          animationData={loading}
          play
          style={{ width: 120, height: 120 }}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
        <span className={styles.message}>{message}</span>
      </Card>
    </div>
  );
};

export default Loader;
