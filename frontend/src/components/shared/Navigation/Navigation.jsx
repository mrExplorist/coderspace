import { Link } from "react-router-dom";
import React from "react";
import { TbBrandSpacehey } from "react-icons/tb";
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

  const { isAuth } = useSelector((state) => state.auth);

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
        <TbBrandSpacehey color="yellow" fontSize="30px" />
        <span style={logoText}>Coderspace</span>
      </Link>

      {isAuth && <button onClick={logoutUser}>Logout</button>}
    </nav>
  );
};

export default Navigation;
