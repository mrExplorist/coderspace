import React, { useEffect, useState } from "react";
import styles from "./StepAvatar.module.css";
import { BsArrowRightShort } from "react-icons/bs";
import { TfiThemifyFaviconAlt } from "react-icons/tfi";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http";
import { setAuth } from "../../../store/authSlice";
import Loader from "../../../components/shared/Loader/Loader";

const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // const [unMounted, setUnMounted] = useState(false);

  const [image, setImage] = useState("");

  function captureImage(e) {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function () {
      console.log(reader.result);
      setImage(reader.result);
      dispatch(setAvatar(reader?.result));
    };
  }

  const { name, avatar } = useSelector((state) => state.activate);

  async function submit() {
    if (!name || !avatar) return;
    setLoading(true);
    try {
      const { data } = await activate({ name, avatar });

      if (data.auth) {
        dispatch(setAuth(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  //!memory leak warning fixes ..

  //By returning a function from the useEffect hook, React will automatically invoke it when the component is unmounted, allowing to clean up any resources or subscriptions.

  if (loading) return <Loader message="Activation in progress ... " />;
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
