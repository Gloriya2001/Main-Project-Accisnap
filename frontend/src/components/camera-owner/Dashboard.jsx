// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import CameraOwnerNavbar from './Navbar';

// const CameraOwnerDashboard = () => {

//     const navigate = useNavigate();
//     // Retrieve user info from local storage
//     const name = localStorage.getItem("name");
//     const email = localStorage.getItem("email");
//     const usertype = localStorage.getItem("usertype");
  
//     const logout = () => {
//       localStorage.clear();
//       navigate("/login");
//     };
  
//     return (
//       <div>
//         <CameraOwnerNavbar/>
//         <h2>Camera Owner Dashboard</h2>
//         <p><strong>Name:</strong> {name}</p>
//         <p><strong>Email:</strong> {email}</p>
//         <p><strong>usertype:</strong> {usertype}</p>
//         <button onClick={logout}>Logout</button>
//       </div>
//     );
//   };
  




// export default CameraOwnerDashboard




import React from 'react';
import { useNavigate } from 'react-router-dom';
import CameraOwnerNavbar from './Navbar';
import styles from '../../css/CameraOwnerDashboard.module.css';
import { FaSignOutAlt, FaCamera, FaVideo, FaChartLine, FaBell, FaCog, FaMapMarkerAlt } from 'react-icons/fa';

const CameraOwnerDashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const usertype = localStorage.getItem("usertype");

  // Get first letter of name for avatar
  const avatarLetter = name ? name.charAt(0).toUpperCase() : 'U';

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Mock data for dashboard stats
  const stats = [
    { icon: <FaCamera />, title: "Active Cameras", value: "5", description: "Currently streaming" },
    { icon: <FaVideo />, title: "Accidents Detected", value: "12", description: "This month" },
    { icon: <FaChartLine />, title: "Detection Accuracy", value: "94%", description: "Last 30 days" }
  ];

  const quickActions = [
    { icon: <FaCamera />, label: "Add Camera", onClick: () => navigate("/camera-owner/camera-register") },
    { icon: <FaVideo />, label: "View Clips", onClick: () => navigate("/camera-owner/accident-clips") },
    { icon: <FaBell />, label: "Alerts", onClick: () => navigate("/alerts") },
    { icon: <FaCog />, label: "Settings", onClick: () => navigate("/settings") }
  ];

  return (
    <div className={styles.dashboard}>
      <CameraOwnerNavbar />
      <div className={styles.header}>
        <h2>Camera Owner Dashboard</h2>
        <p>Monitor and manage your camera network</p>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>{avatarLetter}</div>
            <div className={styles.profileInfo}>
              <h3>{name}</h3>
              <p>Camera Owner</p>
            </div>
          </div>

          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Email</div>
            <div className={styles.detailValue}>{email}</div>
          </div>

          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Account Type</div>
            <div className={styles.detailValue}>{usertype}</div>
          </div>

          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Last Login</div>
            <div className={styles.detailValue}>Today, 10:42 AM</div>
          </div>
        </div>

        <div className={styles.statsCard}>
          <div className={styles.statsHeader}>Camera Network Overview</div>
          
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statInfo}>
                <h4>{stat.value} {stat.title}</h4>
                <p>{stat.description}</p>
              </div>
            </div>
          ))}

          <div className={styles.quickActions}>
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={styles.actionButton}
                onClick={action.onClick}
              >
                <span className={styles.actionIcon}>{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>

          <button onClick={logout} className={styles.logoutButton}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraOwnerDashboard;