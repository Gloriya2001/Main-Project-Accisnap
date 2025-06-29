// import React from "react";
// import { Link } from "react-router-dom";

// const AmbulanceNavbar = () => {
//   return (
//     <nav style={styles.nav}>
//       <ul style={styles.navList}>
//         <li style={styles.navItem}>
//           <Link to="/ambulance/register" style={styles.navLink}>Ambulance Registration</Link>
//         </li>
//         <li style={styles.navItem}>
//           <Link to="/ambulance/alert-details" style={styles.navLink}>Alerts</Link>
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

// export default AmbulanceNavbar;




import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../css//AmbulanceNavbar.module.css";
import { FaAmbulance } from "react-icons/fa";

const AmbulanceNavbar = () => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <div className={styles.logo}>
          <FaAmbulance className={styles.logoIcon} />
          <span>Ambulance Dispatch</span>
        </div>
        <li className={styles.navItem}>
          <Link 
            to="/ambulance/dashboard" 
            className={`${styles.navLink} ${
              location.pathname === "/ambulance/dashboard" ? styles.activeLink : ""
            }`}
          >
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link 
            to="/ambulance/register" 
            className={`${styles.navLink} ${
              location.pathname === "/ambulance/register" ? styles.activeLink : ""
            }`}
          >
            Ambulance Registration
          </Link>
        </li>
       
        {/* <li className={styles.navItem}>
          <Link 
            to="/ambulance/alert-details" 
            className={`${styles.navLink} ${
              location.pathname === "/ambulance/alert-details" ? styles.activeLink : ""
            }`}
          >
            Alerts
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default AmbulanceNavbar;