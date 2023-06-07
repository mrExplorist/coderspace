import { BsArrowRightShort, BsRocketTakeoff } from "react-icons/bs";
import React, { useState } from "react";

import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import { GiRotaryPhone } from "react-icons/gi";
import { GrFormNextLink } from "react-icons/gr";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import { sendOtp } from "../../../../http";
import { setOtp } from "../../../../store/authSlice";
import styles from "../StepPhoneEmail.module.css";
import { useDispatch } from "react-redux";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  async function submit() {
    if (!phoneNumber) return;

    // server request

    const { data } = await sendOtp({ phone: phoneNumber }); // receiving data from server
    console.log(data);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));

    // calling onnext after getting otp

    onNext();
  }
  return (
    <Card
      title="Enter your Phone number "
      icon={<GiRotaryPhone color="#ad1a37" fontSize="44px" />}
    >
      <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button
            text="Next"
            icon={<BsArrowRightShort fontSize="24px" />}
            onClick={submit}
          />
        </div>
        <p className={styles.bottomParagraph}>
          By Entering your number, you are agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>

      {/* <div className={styles.signinWrapper}>
        <span className={styles.hasInvite}>Have an invite text?</span>
        <Link style={signInLinkStyle} to="/login">
          Sign In
        </Link>
      </div> */}
    </Card>
  );
};

export default Phone;
