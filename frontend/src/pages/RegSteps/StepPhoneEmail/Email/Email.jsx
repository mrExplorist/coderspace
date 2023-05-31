import React, { useState } from "react";

import { BsArrowRightShort } from "react-icons/bs";
import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import { MdEmail } from "react-icons/md";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";

const Email = ({ onNext }) => {
  const [email, setEmail] = useState("");
  return (
    <Card
      title="Enter  your Email ID"
      icon={<MdEmail color="white" fontSize="44px" />}
    >
      <TextInput value={Email} onChange={(e) => setEmail(e.target.value)} />
      <div>
        {/* <Button text="Next" icon={<BsArrowRightShort fontSize="24px" />} /> */}
        <div className={styles.actionButtonWrap}>
          <Button
            text="Next"
            icon={<BsArrowRightShort fontSize="24px" />}
            onClick={onNext}
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

export default Email;
