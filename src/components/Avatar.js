import React  from "react";
import styles from "../styles/Avatar.module.css";
import ProfileI from "../assets/profile.png"
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

// const Avatar = ({ src, height = 45, text }) => {
//   return (
//     <span>
//       <img
//         className={styles.Avatar}
//         // src={ProfileI}
//         // src={src}
//         src={src || ProfileI}  // Fallback to ProfileI if src is not provided
//         height={height}
//         width={height}
//         alt="avatar"
//       />
//       {text}
//     </span>
//   );
// };


const Avatar = ({ src, height = 45, text }) => {
const [imgSrc, setImgSrc] = React.useState(src);

  return (
    <span>
      <img
        className={styles.Avatar}
       
        src={imgSrc}
        height={height}
        width={height}
        alt="avatar"
        onError={() => setImgSrc(ProfileI)}  // Fallback to ProfileI if src fails
        />
      {/* {text} */}
    </span>
  );
};

export default Avatar;