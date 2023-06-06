import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/shared/Button/Button";
import Card from "../../components/shared/Card/Card";

import { MdRocketLaunch } from "react-icons/md";
import { FcConferenceCall } from "react-icons/fc";

import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  const signInLinkStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    textDecoration: "none",
  };

  const navigate = useNavigate();
  const startRegister = () => {
    navigate("/authenticate");
    console.log("Button Clicked");
  };
  return (
    <div className={styles.cardWrapper}>
      <Card
        title="Welcome to Coderspace !"
        icon={<FcConferenceCall color="yellow" fontSize="44px" />}
      >
        <p className={styles.text}>
          We’re working hard to get Coderspace ready for everyone! While we wrap
          up the finishing touches, we’re adding people gradually to make sure
          nothing breaks
        </p>

        <div>
          <Button
            onClick={startRegister}
            text="Get your username!!"
            icon={<MdRocketLaunch fontSize="20px" color="cyan" />}
          />
        </div>

        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
          <Link style={signInLinkStyle} to="/login">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
