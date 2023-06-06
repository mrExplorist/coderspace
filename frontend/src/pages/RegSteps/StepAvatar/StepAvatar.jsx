import React, { useState } from "react";
import styles from "./StepAvatar.module.css";
import { BsArrowRightShort } from "react-icons/bs";
import { TfiThemifyFaviconAlt } from "react-icons/tfi";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http";

const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("/images/monkey-avatar.png");

  const { name, avatar } = useSelector((state) => state.activate);

  function captureImage(e) {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function () {
      console.log(reader.result);
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }

  async function submit() {
    try {
      const { data } = await activate({ name, avatar });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card
        title={`Okay, ${name} !`}
        icon={<TfiThemifyFaviconAlt fontSize="34px" color="#a8eb34" />}
      >
        <p className={styles.subHeading}>How's this photo?</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={avatar} alt="avatar" />
        </div>
        <div>
          <input
            onChange={captureImage}
            id="avatarInput"
            type="file"
            className={styles.avatarInput}
          />
          <label className={styles.avatarLabel} htmlFor="avatarInput">
            Choose a different photo
          </label>
        </div>
        <div>
          <Button
            onClick={submit}
            text="Next"
            icon={<BsArrowRightShort fontSize="24px" />}
          />
        </div>
      </Card>
    </>
  );
};

export default StepAvatar;
