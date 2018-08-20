import React from "react";
import logo from "./logo.jpg";
import styles from "./header.css";

const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.title}>ReactJS Marvel Searcher</h1>
    <div className={styles.marvel_brand}>
      <img 
        src={logo}
        className={styles.logo}
        alt="Marvel logo" 
      />
      <small className={styles.small}>Data provided by Marvel. © 2017 MARVEL</small>
    </div>
  </header>
);

export default Header;