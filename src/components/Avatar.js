import React from "react";
import styles from "../styles/Avatar.module.css";
// import ProfileI from "../assets/profile.png"

const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        // src={ProfileI}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;