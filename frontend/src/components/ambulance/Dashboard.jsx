// import React from "react";
// import { useNavigate } from "react-router-dom";
// import AmbulanceNavbar from "./Navbar";

// const AmbulanceDashboard = () => {
//   const navigate = useNavigate();
//   // Retrieve user info from local storage
//   const name = localStorage.getItem("name");
//   const email = localStorage.getItem("email");
//   const usertype = localStorage.getItem("usertype");

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div>
//         <AmbulanceNavbar/>
//       <h2>Ambulance Dashboard</h2>
//       <p><strong>Name:</strong> {name}</p>
//       <p><strong>Email:</strong> {email}</p>
//       <p><strong>usertype:</strong> {usertype}</p>
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// };

// export default AmbulanceDashboard;



import React from "react";
import { useNavigate } from "react-router-dom";
import AmbulanceNavbar from "./Navbar";
import styles from "../../css/AmbulanceDashboard.module.css";
import { FaAmbulance, FaSignOutAlt, FaMapMarkerAlt, FaBell, FaClock, FaCheck, FaTimes } from "react-icons/fa";

const AmbulanceDashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const usertype = localStorage.getItem("usertype");

  // Get first letter of name for avatar
  const avatarLetter = name ? name.charAt(0).toUpperCase() : 'A';

  // Mock alert data
  const alerts = [
    {
      id: 1,
      title: "Severe Collision Detected",
      time: "2 minutes ago",
      location: "Main Street & 5th Avenue",
      severity: "High",
      status: "New"
    },
    {
      id: 2,
      title: "Multi-Vehicle Accident",
      time: "15 minutes ago",
      location: "Highway 101, Exit 42",
      severity: "Critical",
      status: "Dispatched"
    },
    {
      id: 3,
      title: "Pedestrian Incident",
      time: "1 hour ago",
      location: "City Park Intersection",
      severity: "Medium",
      status: "En Route"
    }
  ];

  const stats = [
    { value: "8", label: "Today's Alerts" },
    { value: "3", label: "Pending Response" },
    { value: "94%", label: "Response Rate" },
    { value: "7min", label: "Avg. Response Time" }
  ];

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleRespond = (alertId) => {
    // Handle response to alert
    console.log(`Responding to alert ${alertId}`);
    // In a real app, this would dispatch the ambulance
  };

  const handleDismiss = (alertId) => {
    // Handle dismissing alert
    console.log(`Dismissing alert ${alertId}`);
  };

  return (
    <div className={styles.dashboard}>
      <AmbulanceNavbar />
      <div className={styles.header}>
        <h2>Ambulance Dispatch Dashboard</h2>
        <p>Emergency response system for accident alerts</p>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>{avatarLetter}</div>
            <div className={styles.profileInfo}>
              <h3>{name}</h3>
              <p>Emergency Responder</p>
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
            <div className={styles.detailValue}>Today, 08:42 AM</div>
          </div>

          <div className={styles.quickStats}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
            <button onClick={logout} className={styles.logoutButton}>
            <FaSignOutAlt /> Logout
          </button>
          </div>
        </div>

        {/* <div className={styles.alertsCard}>
          <div className={styles.alertsHeader}>
            <span><FaBell /> Active Alerts</span>
            <span>{alerts.length} New Incidents</span>
          </div>

          {alerts.map(alert => (
            <div key={alert.id} className={styles.alertItem}>
              <div className={styles.alertTitle}>
                <FaAmbulance style={{ marginRight: '0.5rem' }} />
                {alert.title} ({alert.severity})
              </div>
              <div className={styles.alertTime}>
                <FaClock style={{ marginRight: '0.5rem' }} />
                {alert.time}
              </div>
              <div className={styles.alertLocation}>
                <FaMapMarkerAlt style={{ marginRight: '0.5rem' }} />
                {alert.location}
              </div>
              <div className={styles.alertActions}>
                <button 
                  className={`${styles.actionButton} ${styles.primaryAction}`}
                  onClick={() => handleRespond(alert.id)}
                >
                  <FaCheck /> Respond Now
                </button>
                {alert.status === "New" && (
                  <button 
                    className={`${styles.actionButton} ${styles.secondaryAction}`}
                    onClick={() => handleDismiss(alert.id)}
                  >
                    <FaTimes /> Dismiss
                  </button>
                )}
              </div>
            </div>
          ))}

          <button onClick={logout} className={styles.logoutButton}>
            <FaSignOutAlt /> Logout
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AmbulanceDashboard;