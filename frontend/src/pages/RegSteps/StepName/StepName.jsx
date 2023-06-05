import React, { useState } from "react";
import styles from "./StepName.module.css";
import Card from "../../../components/shared/Card/Card";

import Button from "../../../components/shared/Button/Button";
import TextInput from "../../../components/shared/TextInput/TextInput";
import { BsArrowRightShort, BsPersonLinesFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(name);
  function nextStep() {
    if (!fullname) {
      return;
    }
    // dispatching name to the store
    dispatch(setName(fullname));
    onNext();
  }
  return (
    <>
      <Card
        title="What's your full name? "
        icon={<BsPersonLinesFill fontSize="34px" color="#34eba4" />}
      >
        <TextInput
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

        <p className={styles.paragraph}>
          People use real names at coderspace : )
        </p>
        <div>
          <Button
            onClick={nextStep}
            text="Next"
            icon={<BsArrowRightShort fontSize="24px" />}
          />
        </div>
      </Card>
    </>
  );
};

export default StepName;
