import React, { useState } from "react";

import StepOtp from "../RegSteps/StepOtp/StepOtp";
import StepPhoneEmail from "../RegSteps/StepPhoneEmail/StepPhoneEmail";
import styles from "./Login.module.css";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

const Login = () => {
  const [step, setStep] = useState(1);

  const onNext = () => {
    setStep(step + 1);
  };
  const Step = steps[step];
  return <Step onNext={onNext} />;
};

export default Login;
