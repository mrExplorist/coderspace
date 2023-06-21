import React from "react";

import Lottie from "react-lottie-player";

import * as micAnimation from "../../speakwave3.json";

const MicAnimation = () => {
  return (
    <Lottie
      loop
      animationData={micAnimation}
      play
      style={{ width: 60, height: 60 }}
      rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
    />
  );
};

export default MicAnimation;
