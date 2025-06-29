// import React from "react";
// import { Link } from "react-router-dom";

// const CameraOwnerNavbar = () => {
//   return (
//     <nav style={styles.nav}>
//       <ul style={styles.navList}>
//         <li style={styles.navItem}>
//           <Link to="/camera-owner/camera-register" style={styles.navLink}>Camera Register</Link>
//         </li>
//         <li style={styles.navItem}>
//           <Link to="/camera-owner/camera-list" style={styles.navLink}>Camera List</Link>
//         </li>
//         <li style={styles.navItem}>
//           <Link to="/camera-owner/control-panel" style={styles.navLink}>Control panel</Link>
//         </li>
//         <li style={styles.navItem}>
//           <Link to="/camera-owner/accident-clips" style={styles.navLink}>Accident Clips</Link>
//         </li>
//         <li style={styles.navItem}>
//           <Link to="/camera-owner/upload-video" style={styles.navLink}>Detect Accident</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// const styles = {
//   nav: {
//     backgroundColor: "#333",
//     padding: "1rem",
//   },
//   navList: {
//     display: "flex",
//     listStyle: "none",
//     margin: 0,
//     padding: 0,
//   },
//   navItem: {
//     marginRight: "1rem",
//   },
//   navLink: {
//     color: "#fff",
//     textDecoration: "none",
//   },
// };

// export default CameraOwnerNavbar;




import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../css/CameraOwnerNavbar.module.css";
import { FaVideo } from "react-icons/fa"; // You can install react-icons if you want icons

const CameraOwnerNavbar = () => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>

      <li className={styles.navItem}>
          <Link 
            to="/camera-owner/dashboard" 
            className={`${styles.navLink} ${
              location.pathname === "/camera-owner/dashboard" ? styles.activeLink : ""
            }`}
          >
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link 
            to="/camera-owner/camera-register" 
            className={`${styles.navLink} ${
              location.pathname === "/camera-owner/camera-register" ? styles.activeLink : ""
            }`}
          >
            Camera Register
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link 
            to="/camera-owner/camera-list" 
            className={`${styles.navLink} ${
              location.pathname === "/camera-owner/camera-list" ? styles.activeLink : ""
            }`}
          >
            Camera List
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link 
            to="/camera-owner/control-panel" 
            className={`${styles.navLink} ${
              location.pathname === "/camera-owner/control-panel" ? styles.activeLink : ""
            }`}
          >
            Control Panel
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link 
            to="/camera-owner/accident-clips" 
            className={`${styles.navLink} ${
              location.pathname === "/camera-owner/accident-clips" ? styles.activeLink : ""
            }`}
          >
            Accident Clips
          </Link>
        </li>
        {/* <li className={styles.navItem}>
          <Link 
            to="/camera-owner/upload-video" 
            className={`${styles.navLink} ${
              location.pathname === "/camera-owner/upload-video" ? styles.activeLink : ""
            }`}
          >
            Detect Accident
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default CameraOwnerNavbar;