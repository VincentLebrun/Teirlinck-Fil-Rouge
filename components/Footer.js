import React from "react";
// import Link from "next/link";
import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <img src="/logo-removebg-preview.png" alt="" />
        </div>
        <p>Horaires</p>
      </footer>
    </div>
  );
};

export default Footer;
