// import React, { useState, useEffect } from "react";
// import CameraOwnerNavbar from "./Navbar";

// const CameraRegister = () => {
//   const [camera, setCamera] = useState({
//     email: "",
//     location: "",
//     cameraId: "",
//     cameraModel: "",
//     ipAddress: "",
//     phoneNumber: ""
//   });

//   // Auto-load email from localStorage (if available)
//   useEffect(() => {
//     const storedEmail = localStorage.getItem("email");
//     if (storedEmail) {
//       setCamera((prev) => ({ ...prev, email: storedEmail }));
//     }
//   }, []);

//   const handleChange = (e) => {
//     setCamera({ ...camera, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/camera/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(camera),
//       });
//       const data = await res.json();
//       if (data.status === "success") {
//         alert("Camera registered successfully!");
//       } else {
//         alert(data.message || "Registration failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Error registering camera:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div>
//         <CameraOwnerNavbar/>
//       <h2>Camera Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={camera.location}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="cameraId"
//           placeholder="Camera ID"
//           value={camera.cameraId}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="cameraModel"
//           placeholder="Camera Model"
//           value={camera.cameraModel}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="ipAddress"
//           placeholder="Camera IP Address"
//           value={camera.ipAddress}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="tel"
//           name="phoneNumber"
//           placeholder="Phone Number"
//           value={camera.phoneNumber}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default CameraRegister;



import React, { useState, useEffect } from "react";
import CameraOwnerNavbar from "./Navbar";
import styles from "../../css/CameraRegister.module.css";

const CameraRegister = () => {
  const [camera, setCamera] = useState({
    email: "",
    location: "",
    cameraId: "",
    cameraModel: "",
    ipAddress: "",
    phoneNumber: ""
  });
  const [message, setMessage] = useState({ text: "", isError: false });

  // Auto-load email from localStorage (if available)
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setCamera((prev) => ({ ...prev, email: storedEmail }));
    }
  }, []);

  const handleChange = (e) => {
    setCamera({ ...camera, [e.target.name]: e.target.value });
    setMessage({ text: "", isError: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/camera/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(camera),
      });
      const data = await res.json();
      if (data.status === "success") {
        setMessage({ text: "Camera registered successfully!", isError: false });
        // Reset form
        setCamera({
          email: localStorage.getItem("email") || "",
          location: "",
          cameraId: "",
          cameraModel: "",
          ipAddress: "",
          phoneNumber: ""
        });
      } else {
        setMessage({ text: data.message || "Registration failed. Try again.", isError: true });
      }
    } catch (error) {
      console.error("Error registering camera:", error);
      setMessage({ text: "An error occurred. Please try again.", isError: true });
    }
  };

  return (
    <div>
      <CameraOwnerNavbar />
      <div className={styles.container}>

        <div className={styles.header}>
          <h2>Camera Registration</h2>
          <p>Register your surveillance camera with our system</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Location</label>
            <input
              className={styles.formInput}
              type="text"
              name="location"
              placeholder="e.g. Main Street Intersection"
              value={camera.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Camera ID</label>
            <input
              className={styles.formInput}
              type="text"
              name="cameraId"
              placeholder="e.g. CAM-001"
              value={camera.cameraId}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Camera Model</label>
            <input
              className={styles.formInput}
              type="text"
              name="cameraModel"
              placeholder="e.g. Hikvision DS-2CD2342WD-I"
              value={camera.cameraModel}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>IP Address</label>
            <input
              className={styles.formInput}
              type="text"
              name="ipAddress"
              placeholder="e.g. 192.168.1.100"
              value={camera.ipAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Phone Number</label>
            <input
              className={styles.formInput}
              type="tel"
              name="phoneNumber"
              placeholder="e.g. +1234567890"
              value={camera.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          {message.text && (
            <div className={message.isError ? styles.errorMessage : styles.successMessage}>
              {message.text}
            </div>
          )}

          <button type="submit" className={styles.submitButton}>
            Register Camera
          </button>
        </form>
      </div>
    </div>
  );
};

export default CameraRegister;