import React, { useState } from "react";

import Card from "../../components/shared/Card/Card";
import StepAvatar from "../RegSteps/StepAvatar/StepAvatar";
import StepName from "../RegSteps/StepName/StepName";
import StepOtp from "../RegSteps/StepOtp/StepOtp";
import StepPhoneEmail from "../RegSteps/StepPhoneEmail/StepPhoneEmail";
import StepUserName from "../RegSteps/StepUserName/StepUserName";
import styles from "./Register.module.css";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
  3: StepName,
  4: StepAvatar,
  5: StepUserName,
};

const Register = () => {
  // Creating a local state

  const [step, setStep] = useState(1);

  const onNext = () => {
    setStep(step + 1);
  };

  const Step = steps[step]; // Step variable contain a component in local storage having step number
  return (
    <div>
      <Card style={styles.cardWrapper}>
        <Step onNext={onNext} />
      </Card>
    </div>
  );
};

export default Register;
