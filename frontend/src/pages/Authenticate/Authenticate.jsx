import React, { useState } from "react";

import StepOtp from "../RegSteps/StepOtp/StepOtp";
import StepPhoneEmail from "../RegSteps/StepPhoneEmail/StepPhoneEmail";
import styles from "./Authenticate.module.css";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  const onNext = () => {
    setStep(step + 1);
  };
  return <Step onNext={onNext} />; // this will ensure to call onNext
};

export default Authenticate;
