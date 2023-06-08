import { Link } from "react-router-dom";
import React from "react";
import { TbBrandSpacehey } from "react-icons/tb";
import { RiLogoutCircleRFill } from "react-icons/ri";
import styles from "./Navigation.module.css";
import { logout } from "../../../http";
import { setAuth } from "../../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navigation = () => {
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
  };

  const logoText = {
    marginLeft: "10px",
  };

  const dispatch = useDispatch();

  const { isAuth, user } = useSelector((state) => state.auth);

  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <TbBrandSpacehey color="yellow" fontSize="38px" />
        <span style={logoText}>Coderspace</span>
      </Link>

      <div className={styles.navRight}>
        <h3>{user?.name}</h3>
        <Link to="/">
          {user?.avatar && (
            <div className={styles.imageContainer}>
              <img
                src={user?.avatar}
                className={styles.avatar}
                alt="avatar"
                width="46"
                height="46"
              />
            </div>
          )}
        </Link>
        {isAuth && (
          <button className={styles.logoutButton} onClick={logoutUser}>
            <RiLogoutCircleRFill
              color="#0077ff"
              fontSize="46px"
              style={{
                position: "relative",
                left: "8px",
              }}
            />
          </button>
        )}
      </div>
      {/* {isAuth && <button onClick={logoutUser}>Logout</button>} */}
    </nav>
  );
};

export default Navigation;
