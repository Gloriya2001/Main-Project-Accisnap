// import React, { useState, useEffect } from "react";
// import CameraOwnerNavbar from "./Navbar";

// const CameraList = () => {
//   const [cameras, setCameras] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [editingCameraId, setEditingCameraId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     location: "",
//     cameraId: "",
//     cameraModel: "",
//     ipAddress: "",
//     phoneNumber: ""
//   });

//   // Get logged-in user's email from localStorage
//   const userEmail = localStorage.getItem("email");

//   // Fetch cameras registered by this user
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

//   useEffect(() => {
//     if (userEmail) fetchCameras();
//     else {
//       setError("No user email found. Please login first.");
//       setLoading(false);
//     }
//   }, [userEmail]);

//   // Delete a camera by its id
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this camera?")) {
//       try {
//         const res = await fetch(`http://localhost:5000/camera/delete/${id}`, {
//           method: "DELETE"
//         });
//         const data = await res.json();
//         if (data.status === "success") {
//           alert("Camera deleted successfully");
//           fetchCameras();
//         } else {
//           alert(data.message || "Failed to delete camera");
//         }
//       } catch (error) {
//         console.error("Delete error:", error);
//         alert("An error occurred. Please try again.");
//       }
//     }
//   };

//   // Begin editing a camera
//   const handleEditClick = (camera) => {
//     setEditingCameraId(camera._id);
//     setEditForm({
//       location: camera.location,
//       cameraId: camera.cameraId,
//       cameraModel: camera.cameraModel,
//       ipAddress: camera.ipAddress,
//       phoneNumber: camera.phoneNumber
//     });
//   };

//   // Update edit form state
//   const handleEditChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   // Submit edited camera details
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`http://localhost:5000/camera/update/${editingCameraId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editForm)
//       });
//       const data = await res.json();
//       if (data.status === "success") {
//         alert("Camera updated successfully");
//         setEditingCameraId(null);
//         fetchCameras();
//       } else {
//         alert(data.message || "Failed to update camera");
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   if (loading) return <div>Loading cameras...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//         <CameraOwnerNavbar/>
//       <h2>Your Registered Cameras</h2>
//       {cameras.length === 0 ? (
//         <p>No cameras registered.</p>
//       ) : (
//         <ul>
//           {cameras.map((cam) => (
//             <li key={cam._id} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
//               {editingCameraId === cam._id ? (
//                 <form onSubmit={handleEditSubmit}>
//                   <input 
//                     type="text" 
//                     name="location" 
//                     value={editForm.location} 
//                     onChange={handleEditChange} 
//                     required 
//                     placeholder="Location"
//                   />
//                   <input 
//                     type="text" 
//                     name="cameraId" 
//                     value={editForm.cameraId} 
//                     onChange={handleEditChange} 
//                     required 
//                     placeholder="Camera ID"
//                   />
//                   <input 
//                     type="text" 
//                     name="cameraModel" 
//                     value={editForm.cameraModel} 
//                     onChange={handleEditChange} 
//                     required 
//                     placeholder="Camera Model"
//                   />
//                   <input 
//                     type="text" 
//                     name="ipAddress" 
//                     value={editForm.ipAddress} 
//                     onChange={handleEditChange} 
//                     required 
//                     placeholder="IP Address"
//                   />
//                   <input 
//                     type="tel" 
//                     name="phoneNumber" 
//                     value={editForm.phoneNumber} 
//                     onChange={handleEditChange} 
//                     required 
//                     placeholder="Phone Number"
//                   />
//                   <button type="submit">Save</button>
//                   <button type="button" onClick={() => setEditingCameraId(null)}>
//                     Cancel
//                   </button>
//                 </form>
//               ) : (
//                 <>
//                   <p><strong>Camera ID:</strong> {cam.cameraId}</p>
//                   <p><strong>Model:</strong> {cam.cameraModel}</p>
//                   <p><strong>Location:</strong> {cam.location}</p>
//                   <p><strong>IP Address:</strong> {cam.ipAddress}</p>
//                   <p><strong>Phone Number:</strong> {cam.phoneNumber}</p>
//                   <button onClick={() => handleEditClick(cam)}>Edit</button>
//                   <button onClick={() => handleDelete(cam._id)}>Delete</button>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CameraList;




import React, { useState, useEffect } from "react";
import CameraOwnerNavbar from "./Navbar";
import styles from "../../css/CameraList.module.css";
import { FaCamera, FaMapMarkerAlt, FaWifi, FaPhone, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const CameraList = () => {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCameraId, setEditingCameraId] = useState(null);
  const [editForm, setEditForm] = useState({
    location: "",
    cameraId: "",
    cameraModel: "",
    ipAddress: "",
    phoneNumber: ""
  });

  const userEmail = localStorage.getItem("email");

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

  useEffect(() => {
    if (userEmail) fetchCameras();
    else {
      setError("No user email found. Please login first.");
      setLoading(false);
    }
  }, [userEmail]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this camera?")) {
      try {
        const res = await fetch(`http://localhost:5000/camera/delete/${id}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (data.status === "success") {
          alert("Camera deleted successfully");
          fetchCameras();
        } else {
          alert(data.message || "Failed to delete camera");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const handleEditClick = (camera) => {
    setEditingCameraId(camera._id);
    setEditForm({
      location: camera.location,
      cameraId: camera.cameraId,
      cameraModel: camera.cameraModel,
      ipAddress: camera.ipAddress,
      phoneNumber: camera.phoneNumber
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/camera/update/${editingCameraId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm)
      });
      const data = await res.json();
      if (data.status === "success") {
        alert("Camera updated successfully");
        setEditingCameraId(null);
        fetchCameras();
      } else {
        alert(data.message || "Failed to update camera");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) return <div className={styles.loading}>Loading cameras...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div>
      <CameraOwnerNavbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Your Registered Cameras</h2>
          <p>Manage and update your camera network</p>
        </div>

        {cameras.length === 0 ? (
          <div className={styles.emptyState}>
            <FaCamera size={48} style={{ color: "#cbd5e1" }} />
            <p>No cameras registered yet.</p>
          </div>
        ) : (
          <div className={styles.cameraGrid}>
            {cameras.map((cam) => (
              <div key={cam._id} className={styles.cameraCard}>
                {editingCameraId === cam._id ? (
                  <form className={styles.editForm} onSubmit={handleEditSubmit}>
                    <input
                      className={styles.formInput}
                      type="text"
                      name="location"
                      value={editForm.location}
                      onChange={handleEditChange}
                      required
                      placeholder="Location"
                    />
                    <input
                      className={styles.formInput}
                      type="text"
                      name="cameraId"
                      value={editForm.cameraId}
                      onChange={handleEditChange}
                      required
                      placeholder="Camera ID"
                    />
                    <input
                      className={styles.formInput}
                      type="text"
                      name="cameraModel"
                      value={editForm.cameraModel}
                      onChange={handleEditChange}
                      required
                      placeholder="Camera Model"
                    />
                    <input
                      className={styles.formInput}
                      type="text"
                      name="ipAddress"
                      value={editForm.ipAddress}
                      onChange={handleEditChange}
                      required
                      placeholder="IP Address"
                    />
                    <input
                      className={styles.formInput}
                      type="tel"
                      name="phoneNumber"
                      value={editForm.phoneNumber}
                      onChange={handleEditChange}
                      required
                      placeholder="Phone Number"
                    />
                    <div className={styles.buttonGroup}>
                      <button type="submit" className={`${styles.button} ${styles.saveButton}`}>
                        <FaSave /> Save
                      </button>
                      <button
                        type="button"
                        className={`${styles.button} ${styles.cancelButton}`}
                        onClick={() => setEditingCameraId(null)}
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className={styles.cameraInfo}>
                      <p>
                        <strong>Camera ID:</strong> 
                        <span className={styles.cameraIcon}><FaCamera /></span>
                        {cam.cameraId}
                      </p>
                      <p>
                        <strong>Model:</strong> {cam.cameraModel}
                      </p>
                      <p>
                        <strong>Location:</strong> 
                        <span className={styles.cameraIcon}><FaMapMarkerAlt /></span>
                        {cam.location}
                      </p>
                      <p>
                        <strong>IP Address:</strong> 
                        <span className={styles.cameraIcon}><FaWifi /></span>
                        {cam.ipAddress}
                      </p>
                      <p>
                        <strong>Phone Number:</strong> 
                        <span className={styles.cameraIcon}><FaPhone /></span>
                        {cam.phoneNumber}
                      </p>
                    </div>
                    <div className={styles.buttonGroup}>
                      <button
                        onClick={() => handleEditClick(cam)}
                        className={`${styles.button} ${styles.editButton}`}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cam._id)}
                        className={`${styles.button} ${styles.deleteButton}`}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraList;