// // // import React, { useState, useEffect } from "react";
// // // import CameraOwnerNavbar from "./Navbar";

// // // const ControlPanel = () => {
// // //   const [cameras, setCameras] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");
// // //   const [streams, setStreams] = useState({}); // Store active streams

// // //   const userEmail = localStorage.getItem("email");

// // //   const fetchCameras = async () => {
// // //     try {
// // //       const res = await fetch(`http://localhost:5000/camera/all?email=${userEmail}`);
// // //       const data = await res.json();
// // //       if (data.status === "success") {
// // //         setCameras(data.data);
// // //       } else {
// // //         setError(data.message || "Failed to fetch cameras");
// // //       }
// // //     } catch (err) {
// // //       console.error("Error fetching cameras:", err);
// // //       setError("An error occurred while fetching cameras.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (userEmail) {
// // //       fetchCameras();
// // //     } else {
// // //       setError("No user email found. Please log in.");
// // //       setLoading(false);
// // //     }
// // //   }, [userEmail]);

// // //   const handleConnect = (cameraId, ipAddress) => {
// // //     const url = `http://localhost:8000/camera-live-connect?cameraId=${encodeURIComponent(cameraId)}&url=${encodeURIComponent(ipAddress)}`;
// // //     setStreams(prev => ({ ...prev, [cameraId]: url }));
// // //   };

// // //   const handleStop = async (cameraId) => {
// // //     try {
// // //       const response = await fetch("http://localhost:8000/camera-stop", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ cameraId }),
// // //       });
  
// // //       const data = await response.json();
// // //       console.log("Stop Camera Response:", data); // Log backend response
  
// // //       if (response.ok) {
// // //         setStreams((prev) => {
// // //           const updatedStreams = { ...prev };
// // //           delete updatedStreams[cameraId];
// // //           return updatedStreams;
// // //         });
// // //       } else {
// // //         console.error("Error stopping camera:", data);
// // //       }
// // //     } catch (err) {
// // //       console.error("Error stopping camera:", err);
// // //     }
// // //   };
  
  




// // //   if (loading) return <div>Loading your cameras...</div>;
// // //   if (error) return <div>Error: {error}</div>;

// // //   return (
// // //     <div>
// // //       <CameraOwnerNavbar />
// // //       <h2>Your Camera Control Panel</h2>

// // //       {cameras.length === 0 ? (
// // //         <p>You have no cameras registered yet.</p>
// // //       ) : (
// // //         <div>
// // //           <h3>Registered Cameras</h3>
// // //           <div style={styles.cameraGrid}>
// // //             {cameras.map((camera) => (
// // //               <div key={camera._id} style={styles.cameraItem}>
// // //                 <h4>{camera.cameraId}</h4>
// // //                 <p><strong>Location:</strong> {camera.location}</p>
// // //                 <p><strong>Model:</strong> {camera.cameraModel}</p>
// // //                 <p><strong>IP Address:</strong> {camera.ipAddress}</p>
// // //                 <p><strong>Phone Number:</strong> {camera.phoneNumber}</p>
// // //                 {streams[camera.cameraId] ? (
// // //                   <>
// // //                     <img src={streams[camera.cameraId]} alt="Live Stream" style={styles.liveStream} />
// // //                     <button style={styles.disconnectButton} onClick={() => handleStop(camera.cameraId)}>
// // //                       Stop Stream
// // //                     </button>
// // //                   </>
// // //                 ) : (
// // //                   <button style={styles.connectButton} onClick={() => handleConnect(camera.cameraId, camera.ipAddress)}>
// // //                     Connect to Camera
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // const styles = {
// // //   cameraGrid: {
// // //     display: "grid",
// // //     gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
// // //     gap: "16px",
// // //     marginTop: "20px",
// // //   },
// // //   cameraItem: {
// // //     border: "1px solid #ccc",
// // //     padding: "1rem",
// // //     borderRadius: "8px",
// // //     backgroundColor: "#f9f9f9",
// // //     textAlign: "center",
// // //   },
// // //   connectButton: {
// // //     padding: "8px 16px",
// // //     backgroundColor: "#4CAF50",
// // //     color: "white",
// // //     border: "none",
// // //     borderRadius: "4px",
// // //     cursor: "pointer",
// // //     marginTop: "10px",
// // //   },
// // //   disconnectButton: {
// // //     padding: "8px 16px",
// // //     backgroundColor: "#d9534f",
// // //     color: "white",
// // //     border: "none",
// // //     borderRadius: "4px",
// // //     cursor: "pointer",
// // //     marginTop: "10px",
// // //   },
// // //   liveStream: {
// // //     width: "100%",
// // //     maxWidth: "640px",
// // //     borderRadius: "8px",
// // //     marginTop: "10px",
// // //   },
// // // };

// // // export default ControlPanel;





// // import React, { useState, useEffect } from "react";
// // import CameraOwnerNavbar from "./Navbar";

// // const ControlPanel = () => {
// //   const [cameras, setCameras] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [streams, setStreams] = useState({}); // Store active streams
// //   const [wsConnections, setWsConnections] = useState({}); // Store WebSocket connections

// //   const userEmail = localStorage.getItem("email");

// //   const fetchCameras = async () => {
// //     try {
// //       const res = await fetch(`http://localhost:5000/camera/all?email=${userEmail}`);
// //       const data = await res.json();
// //       if (data.status === "success") {
// //         setCameras(data.data);
// //       } else {
// //         setError(data.message || "Failed to fetch cameras");
// //       }
// //     } catch (err) {
// //       console.error("Error fetching cameras:", err);
// //       setError("An error occurred while fetching cameras.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (userEmail) {
// //       fetchCameras();
// //     } else {
// //       setError("No user email found. Please log in.");
// //       setLoading(false);
// //     }
// //   }, [userEmail]);

// //   const handleConnect = (cameraId, ipAddress) => {
// //     const url = `http://localhost:8000/camera-live-connect?cameraId=${encodeURIComponent(cameraId)}&url=${encodeURIComponent(ipAddress)}`;
// //     setStreams(prev => ({ ...prev, [cameraId]: url }));

// //     // Open WebSocket connection for accident alerts
// //     const ws = new WebSocket(`ws://localhost:8000/ws/${cameraId}`);
// //     ws.onmessage = (event) => {
// //       const data = JSON.parse(event.data);
// //       if (data.alert) {
// //         console.log(`Accident Alert from Camera ${cameraId}:`, data.alert);
// //         playAlertSound();
      
// //       }
// //     };
// //     ws.onclose = () => console.log(`WebSocket closed for Camera ${cameraId}`);
// //     setWsConnections(prev => ({ ...prev, [cameraId]: ws }));
// //   };

// //   const handleStop = async (cameraId) => {
// //     try {
// //       const response = await fetch("http://localhost:8000/camera-stop", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ cameraId }),
// //       });
// //       const data = await response.json();
// //       console.log("Stop Camera Response:", data);
// //       if (response.ok) {
// //         setStreams(prev => {
// //           const updatedStreams = { ...prev };
// //           delete updatedStreams[cameraId];
// //           return updatedStreams;
// //         });
// //         if (wsConnections[cameraId]) {
// //           wsConnections[cameraId].close();
// //           setWsConnections(prev => {
// //             const updatedWs = { ...prev };
// //             delete updatedWs[cameraId];
// //             return updatedWs;
// //           });
// //         }
// //       } else {
// //         console.error("Error stopping camera:", data);
// //       }
// //     } catch (err) {
// //       console.error("Error stopping camera:", err);
// //     }
// //   };

// //   const playAlertSound = () => {
// //     const audio = new Audio("/alert.mp3"); // Place your sound file in the public folder
// //     audio.play().catch(err => console.error("Error playing sound:", err));
// //   };

// //   if (loading) return <div>Loading your cameras...</div>;
// //   if (error) return <div>Error: {error}</div>;

// //   return (
// //     <div>
// //       <CameraOwnerNavbar />
// //       <h2>Your Camera Control Panel</h2>

// //       {cameras.length === 0 ? (
// //         <p>You have no cameras registered yet.</p>
// //       ) : (
// //         <div>
// //           <h3>Registered Cameras</h3>
// //           <div style={styles.cameraGrid}>
// //             {cameras.map((camera) => (
// //               <div key={camera._id} style={styles.cameraItem}>
// //                 <h4>{camera.cameraId}</h4>
// //                 <p><strong>Location:</strong> {camera.location}</p>
// //                 <p><strong>Model:</strong> {camera.cameraModel}</p>
// //                 <p><strong>IP Address:</strong> {camera.ipAddress}</p>
// //                 <p><strong>Phone Number:</strong> {camera.phoneNumber}</p>
// //                 {streams[camera.cameraId] ? (
// //                   <>
// //                     <img src={streams[camera.cameraId]} alt="Live Stream" style={styles.liveStream} />
// //                     <button style={styles.disconnectButton} onClick={() => handleStop(camera.cameraId)}>
// //                       Stop Stream
// //                     </button>
// //                   </>
// //                 ) : (
// //                   <button style={styles.connectButton} onClick={() => handleConnect(camera.cameraId, camera.ipAddress)}>
// //                     Connect to Camera
// //                   </button>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const styles = {
// //   cameraGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
// //     gap: "16px",
// //     marginTop: "20px",
// //   },
// //   cameraItem: {
// //     border: "1px solid #ccc",
// //     padding: "1rem",
// //     borderRadius: "8px",
// //     backgroundColor: "#f9f9f9",
// //     textAlign: "center",
// //   },
// //   connectButton: {
// //     padding: "8px 16px",
// //     backgroundColor: "#4CAF50",
// //     color: "white",
// //     border: "none",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //     marginTop: "10px",
// //   },
// //   disconnectButton: {
// //     padding: "8px 16px",
// //     backgroundColor: "#d9534f",
// //     color: "white",
// //     border: "none",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //     marginTop: "10px",
// //   },
// //   liveStream: {
// //     width: "100%",
// //     maxWidth: "640px",
// //     borderRadius: "8px",
// //     marginTop: "10px",
// //   },
// // };

// // export default ControlPanel;



// import React, { useState, useEffect } from "react";
// import CameraOwnerNavbar from "./Navbar";

// const ControlPanel = () => {
//   const [cameras, setCameras] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [streams, setStreams] = useState({});
//   const [wsConnections, setWsConnections] = useState({});

//   const userEmail = localStorage.getItem("email");

//   useEffect(() => {
//     if (userEmail) {
//       fetchCameras();
//     } else {
//       setError("No user email found. Please log in.");
//       setLoading(false);
//     }

//     // Reconnect active streams when component mounts
//     const activeCameras = JSON.parse(localStorage.getItem("activeCameras")) || {};
//     Object.keys(activeCameras).forEach((cameraId) => {
//       handleConnect(cameraId, activeCameras[cameraId]);
//     });
//   }, []);

//   const fetchCameras = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/camera/all?email=${userEmail}`);
//       const data = await res.json();
//       if (data.status === "success") {
//         setCameras(data.data);
//       } else {
//         setError(data.message || "Failed to fetch cameras");
//       }
//     } catch (err) {
//       console.error("Error fetching cameras:", err);
//       setError("An error occurred while fetching cameras.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleConnect = (cameraId, ipAddress) => {
//     const url = `http://localhost:8000/camera-live-connect?cameraId=${encodeURIComponent(cameraId)}&url=${encodeURIComponent(ipAddress)}`;
//     setStreams((prev) => ({ ...prev, [cameraId]: url }));

//     // Save active camera connections to localStorage
//     const activeCameras = JSON.parse(localStorage.getItem("activeCameras")) || {};
//     activeCameras[cameraId] = ipAddress;
//     localStorage.setItem("activeCameras", JSON.stringify(activeCameras));

//     const ws = new WebSocket(`ws://localhost:8000/ws/${cameraId}`);
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.alert) {
//         console.log(`Accident Alert from Camera ${cameraId}:`, data.alert);
//         playAlertSound();
//       }
//     };
//     ws.onclose = () => console.log(`WebSocket closed for Camera ${cameraId}`);
//     setWsConnections((prev) => ({ ...prev, [cameraId]: ws }));
//   };

//   const handleStop = async (cameraId) => {
//     try {
//       const response = await fetch("http://localhost:8000/camera-stop", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ cameraId }),
//       });

//       const data = await response.json();
//       console.log("Stop Camera Response:", data);
//       if (response.ok) {
//         setStreams((prev) => {
//           const updatedStreams = { ...prev };
//           delete updatedStreams[cameraId];
//           return updatedStreams;
//         });

//         // Remove from localStorage
//         const activeCameras = JSON.parse(localStorage.getItem("activeCameras")) || {};
//         delete activeCameras[cameraId];
//         localStorage.setItem("activeCameras", JSON.stringify(activeCameras));

//         if (wsConnections[cameraId]) {
//           wsConnections[cameraId].close();
//           setWsConnections((prev) => {
//             const updatedWs = { ...prev };
//             delete updatedWs[cameraId];
//             return updatedWs;
//           });
//         }
//       } else {
//         console.error("Error stopping camera:", data);
//       }
//     } catch (err) {
//       console.error("Error stopping camera:", err);
//     }
//   };

//   const playAlertSound = () => {
//     const audio = new Audio("/alert.mp3");
//     audio.play().catch((err) => console.error("Error playing sound:", err));
//   };

//   if (loading) return <div>Loading your cameras...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <CameraOwnerNavbar />
//       <h2>Your Camera Control Panel</h2>

//       {cameras.length === 0 ? (
//         <p>You have no cameras registered yet.</p>
//       ) : (
//         <div>
//           <h3>Registered Cameras</h3>
//           <div style={styles.cameraGrid}>
//             {cameras.map((camera) => (
//               <div key={camera._id} style={styles.cameraItem}>
//                 <h4>{camera.cameraId}</h4>
//                 <p><strong>Location:</strong> {camera.location}</p>
//                 <p><strong>Model:</strong> {camera.cameraModel}</p>
//                 <p><strong>IP Address:</strong> {camera.ipAddress}</p>
//                 <p><strong>Phone Number:</strong> {camera.phoneNumber}</p>
//                 {streams[camera.cameraId] ? (
//                   <>
//                     <img src={streams[camera.cameraId]} alt="Live Stream" style={styles.liveStream} />
//                     <button style={styles.disconnectButton} onClick={() => handleStop(camera.cameraId)}>
//                       Stop Stream
//                     </button>
//                   </>
//                 ) : (
//                   <button style={styles.connectButton} onClick={() => handleConnect(camera.cameraId, camera.ipAddress)}>
//                     Connect to Camera
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   cameraGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//     gap: "16px",
//     marginTop: "20px",
//   },
//   cameraItem: {
//     border: "1px solid #ccc",
//     padding: "1rem",
//     borderRadius: "8px",
//     backgroundColor: "#f9f9f9",
//     textAlign: "center",
//   },
//   connectButton: {
//     padding: "8px 16px",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     marginTop: "10px",
//   },
//   disconnectButton: {
//     padding: "8px 16px",
//     backgroundColor: "#d9534f",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     marginTop: "10px",
//   },
//   liveStream: {
//     width: "100%",
//     maxWidth: "640px",
//     borderRadius: "8px",
//     marginTop: "10px",
//   },
// };

// export default ControlPanel;


import React, { useState, useEffect } from "react";
import CameraOwnerNavbar from "./Navbar";
import styles from "../../css/ControlPanel.module.css";
import { FaPlay, FaStop, FaCamera, FaMapMarkerAlt, FaMobileAlt, FaWifi } from "react-icons/fa";

const ControlPanel = () => {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [streams, setStreams] = useState({});
  const [wsConnections, setWsConnections] = useState({});
  const [alertCameras, setAlertCameras] = useState([]);

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    if (userEmail) {
      fetchCameras();
    } else {
      setError("No user email found. Please log in.");
      setLoading(false);
    }

    // Reconnect active streams when component mounts
    const activeCameras = JSON.parse(localStorage.getItem("activeCameras")) || {};
    Object.keys(activeCameras).forEach((cameraId) => {
      handleConnect(cameraId, activeCameras[cameraId]);
    });

    return () => {
      // Clean up WebSocket connections
      Object.values(wsConnections).forEach(ws => ws.close());
    };
  }, []);

  const fetchCameras = async () => {
    try {
      const res = await fetch(`http://localhost:5000/camera/all?email=${userEmail}`);
      const data = await res.json();
      if (data.status === "success") {
        setCameras(data.data);
      } else {
        setError(data.message || "Failed to fetch cameras");
      }
    } catch (err) {
      console.error("Error fetching cameras:", err);
      setError("An error occurred while fetching cameras.");
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = (cameraId, ipAddress) => {
    const url = `http://localhost:8000/camera-live-connect?cameraId=${encodeURIComponent(cameraId)}&url=${encodeURIComponent(ipAddress)}`;
    setStreams((prev) => ({ ...prev, [cameraId]: url }));

    // Save active camera connections to localStorage
    const activeCameras = JSON.parse(localStorage.getItem("activeCameras")) || {};
    activeCameras[cameraId] = ipAddress;
    localStorage.setItem("activeCameras", JSON.stringify(activeCameras));

    const ws = new WebSocket(`ws://localhost:8000/ws/${cameraId}`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.alert) {
        console.log(`Accident Alert from Camera ${cameraId}:`, data.alert);
        playAlertSound();
        setAlertCameras(prev => [...prev, cameraId]);
        setTimeout(() => {
          setAlertCameras(prev => prev.filter(id => id !== cameraId));
        }, 10000); // Remove alert after 10 seconds
      }
    };
    ws.onclose = () => console.log(`WebSocket closed for Camera ${cameraId}`);
    setWsConnections((prev) => ({ ...prev, [cameraId]: ws }));
  };

  const handleStop = async (cameraId) => {
    try {
      const response = await fetch("http://localhost:8000/camera-stop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cameraId }),
      });

      const data = await response.json();
      console.log("Stop Camera Response:", data);
      if (response.ok) {
        setStreams((prev) => {
          const updatedStreams = { ...prev };
          delete updatedStreams[cameraId];
          return updatedStreams;
        });

        // Remove from localStorage
        const activeCameras = JSON.parse(localStorage.getItem("activeCameras")) || {};
        delete activeCameras[cameraId];
        localStorage.setItem("activeCameras", JSON.stringify(activeCameras));

        if (wsConnections[cameraId]) {
          wsConnections[cameraId].close();
          setWsConnections((prev) => {
            const updatedWs = { ...prev };
            delete updatedWs[cameraId];
            return updatedWs;
          });
        }
      } else {
        console.error("Error stopping camera:", data);
      }
    } catch (err) {
      console.error("Error stopping camera:", err);
    }
  };

  const playAlertSound = () => {
    const audio = new Audio("/alert.mp3");
    audio.play().catch((err) => console.error("Error playing sound:", err));
  };

  if (loading) return <div className={styles.loading}>Loading your cameras...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.controlPanelContainer}>
      <CameraOwnerNavbar />
      <div className={styles.header}>
        <h2>Camera Control Panel</h2>
        <p>Manage and monitor your connected cameras</p>
      </div>

      {cameras.length === 0 ? (
        <div className={styles.noCameras}>
          <FaCamera size={48} style={{ marginBottom: '1rem', color: '#bdc3c7' }} />
          <p>You have no cameras registered yet.</p>
        </div>
      ) : (
        <div className={styles.cameraSection}>
          <h3 className={styles.sectionTitle}>Your Camera Network</h3>
          <div className={styles.cameraGrid}>
            {cameras.map((camera) => (
              <div 
                key={camera._id} 
                className={`${styles.cameraCard} ${
                  alertCameras.includes(camera.cameraId) ? styles.alertActive : ''
                }`}
              >
                <h4>
                  <span className={`${styles.statusIndicator} ${
                    streams[camera.cameraId] ? styles.statusActive : styles.statusInactive
                  }`}></span>
                  {camera.cameraId}
                </h4>
                <div className={styles.cameraInfo}>
                  <p><FaMapMarkerAlt /> <strong>Location:</strong> {camera.location}</p>
                  <p><FaCamera /> <strong>Model:</strong> {camera.cameraModel}</p>
                  <p><FaWifi /> <strong>IP Address:</strong> {camera.ipAddress}</p>
                  <p><FaMobileAlt /> <strong>Phone:</strong> {camera.phoneNumber}</p>
                </div>
                {streams[camera.cameraId] ? (
                  <>
                    <img 
                      src={streams[camera.cameraId]} 
                      alt="Live Stream" 
                      className={styles.liveStream} 
                    />
                    <button 
                      className={`${styles.button} ${styles.disconnectButton}`}
                      onClick={() => handleStop(camera.cameraId)}
                    >
                      <FaStop /> Stop Stream
                    </button>
                  </>
                ) : (
                  <button 
                    className={`${styles.button} ${styles.connectButton}`}
                    onClick={() => handleConnect(camera.cameraId, camera.ipAddress)}
                  >
                    <FaPlay /> Connect to Camera
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
