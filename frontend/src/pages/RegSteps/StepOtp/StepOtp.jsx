import React, { useState } from "react";

import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import { FcUnlock } from "react-icons/fc";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "./StepOtp.module.css";
import { verifyOtp } from "../../../http";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { phone, hash } = useSelector((state) => state.auth.otp);
  async function submit() {
    // await onNext();
    try {
      const { data } = await verifyOtp({ otp, phone, hash });
      console.log(data); // logging the data from server
      dispatch(setAuth(data));
      // onNext();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card
          title="Enter the code we just texted you"
          icon={<FcUnlock fontSize="44px" />}
        >
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text="Next" />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
