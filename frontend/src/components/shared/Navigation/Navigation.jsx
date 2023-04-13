import { Link } from "react-router-dom";
import React from "react";
import { TbBrandSpacehey } from "react-icons/tb";
import styles from "./Navigation.module.css";

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
  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <TbBrandSpacehey color="yellow" fontSize="30px" />
        <span style={logoText}>Coderspace</span>
      </Link>
    </nav>
  );
};

export default Navigation;
