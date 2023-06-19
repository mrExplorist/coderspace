import React from "react";

import Lottie from "react-lottie";

import * as micAnimation from "../../speakwave3.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: micAnimation.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const MicAnimation = () => {
  return <Lottie options={defaultOptions} height={70} width={70} />;
};

export default MicAnimation;
