
// import React, { useState, useEffect } from "react";
// import CameraOwnerNavbar from "./Navbar";

// const AccidentClips = () => {
//   const [cameras, setCameras] = useState([]);
//   const [accidents, setAccidents] = useState({});
//   const [visibleCameras, setVisibleCameras] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Get logged-in user's email from localStorage
//   const userEmail = localStorage.getItem("email");

//   // Fetch cameras registered by this user
//   useEffect(() => {
//     const fetchCameras = async () => {
//       if (!userEmail) {
//         setError("No user email found. Please log in first.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch(`http://localhost:5000/camera/all?email=${userEmail}`);
//         const data = await res.json();
//         if (data.status === "success") {
//           setCameras(data.data);
//         } else {
//           setError(data.message || "Failed to fetch cameras");
//         }
//       } catch (err) {
//         console.error("Error fetching cameras:", err);
//         setError("An error occurred while fetching cameras.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCameras();
//   }, [userEmail]);

//   // Fetch accident clips for a specific camera & toggle visibility
//   const toggleAccidentClips = async (cameraId) => {
//     setVisibleCameras((prev) => ({
//       ...prev,
//       [cameraId]: !prev[cameraId], // Toggle visibility state
//     }));

//     if (!accidents[cameraId]) {
//       try {
//         const res = await fetch(`http://localhost:5000/accident-clips?cameraId=${cameraId}`);
//         const data = await res.json();
//         if (res.ok) {
//           setAccidents((prev) => ({ ...prev, [cameraId]: data })); // Store clips per camera
//         } else {
//           console.error("Failed to fetch accident clips:", data.message);
//         }
//       } catch (err) {
//         console.error("Error fetching accident clips:", err);
//       }
//     }
//   };

//   if (loading) return <div>Loading cameras...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <CameraOwnerNavbar />
//       <h2>Your Registered Cameras</h2>
//       {cameras.length === 0 ? (
//         <p>No cameras registered.</p>
//       ) : (
//         <ul>
//           {cameras.map((cam) => (
//             <li key={cam._id} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
//               <p><strong>Camera ID:</strong> {cam.cameraId}</p>
//               <p><strong>Location:</strong> {cam.location}</p>
//               <button onClick={() => toggleAccidentClips(cam.cameraId)}>
//                 {visibleCameras[cam.cameraId] ? "Hide Accident Details" : "Show Accident Details"}
//               </button>

//               {/* Show Accident Clips if visible */}
//               {visibleCameras[cam.cameraId] && accidents[cam.cameraId] && (
//                 <div>
//                   <h4>Accident Clips:</h4>
//                   {accidents[cam.cameraId].length > 0 ? (
//                     accidents[cam.cameraId].map((clip) => (
//                       <div key={clip._id} style={{ marginTop: "1rem" }}>
//                         <video width="320" height="240" controls>
//                           <source src={`http://localhost:8000${clip.accidentClip}`} type="video/mp4" />
//                           Your browser does not support the video tag.
//                         </video>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No detected accidents</p>
//                   )}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AccidentClips;



import React, { useState, useEffect } from "react";
import CameraOwnerNavbar from "./Navbar";
import styles from "../../css/AccidentClips.module.css";
import { FaMapMarkerAlt, FaVideo, FaChevronDown, FaChevronUp } from "react-icons/fa";

const AccidentClips = () => {
    const [cameras, setCameras] = useState([]);
    const [accidents, setAccidents] = useState({});
    const [visibleCameras, setVisibleCameras] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const userEmail = localStorage.getItem("email");

    useEffect(() => {
        const fetchCameras = async () => {
            if (!userEmail) {
                setError("No user email found. Please log in first.");
                setLoading(false);
                return;
            }

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

        fetchCameras();
    }, [userEmail]);

    const toggleAccidentClips = async (cameraId) => {
        setVisibleCameras((prev) => ({
            ...prev,
            [cameraId]: !prev[cameraId],
        }));

        if (!accidents[cameraId]) {
            try {
                const res = await fetch(`http://localhost:5000/accident-clips?cameraId=${cameraId}`);
                const data = await res.json();
                if (res.ok) {
                    setAccidents((prev) => ({ ...prev, [cameraId]: data }));
                } else {
                    console.error("Failed to fetch accident clips:", data.message);
                }
            } catch (err) {
                console.error("Error fetching accident clips:", err);
            }
        }
    };

    if (loading) return (
        <div className={styles.dashboard}>
            <div className={styles.loading}>
                <div className={styles.pulse}>Loading your cameras...</div>
            </div>
        </div>
    );

    if (error) return (
        <div className={styles.dashboard}>
            <div className={styles.error}>{error}</div>
        </div>
    );

    return (
        <div className={styles.dashboard}>
            <CameraOwnerNavbar />
            <div className={styles.header}>
                <h2>Accident Detection Dashboard</h2>
                <p>Review and analyze accident clips detected by your camera network</p>
            </div>

            {cameras.length === 0 ? (
                <div className={styles.emptyState}>
                    <FaVideo size={48} style={{ color: "#e5e7eb" }} />
                    <p>No cameras registered yet.</p>
                </div>
            ) : (
                <div className={styles.cameraGrid}>
                    {cameras.map((cam) => (
                        <div key={cam._id} className={styles.cameraCard}>
                            <div className={styles.cameraHeader}>
                                <div className={styles.cameraInfo}>
                                    <div className={styles.cameraId}>{cam.cameraId}</div>
                                    <div className={styles.cameraLocation}>
                                        <FaMapMarkerAlt size={14} />
                                        {cam.location}
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleAccidentClips(cam.cameraId)}
                                    className={styles.toggleButton}
                                >
                                    {visibleCameras[cam.cameraId] ? (
                                        <>
                                            <FaChevronUp size={14} /> Hide
                                        </>
                                    ) : (
                                        <>
                                            <FaChevronDown size={14} /> Show
                                        </>
                                    )}
                                </button>
                            </div>

                            {visibleCameras[cam.cameraId] && (
                                <div className={styles.accidentsContainer}>
                                    <div className={styles.accidentsTitle}>
                                        <FaVideo /> Accident Clips
                                    </div>
                                    {accidents[cam.cameraId] ? (
                                        accidents[cam.cameraId].length > 0 ? (
                                            <div className={styles.videoGrid}>
                                                {accidents[cam.cameraId].map((clip) => (
                                                    <div key={clip._id} className={styles.videoCard}>
                                                        <video controls className={styles.videoPlayer}>
                                                            <source src={`http://localhost:8000${clip.accidentClip}`} type="video/mp4" />


                                                            Your browser does not support the video tag.
                                                        </video>
                                                        <div className={styles.videoTimestamp}>
                                                            {new Date(clip.timestamp).toLocaleString()}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className={styles.noAccidents}>No accidents detected</div>
                                        )
                                    ) : (
                                        <div className={styles.loading}>Loading accident data...</div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AccidentClips;