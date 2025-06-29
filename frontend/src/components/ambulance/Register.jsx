// import React, { useState, useEffect } from "react";
// import AmbulanceNavbar from "./Navbar";

// const AmbulanceRegister = () => {
//   const [ambulance, setAmbulance] = useState({
//     place: "",
//     ambulanceNumber: "",
//     hospitalName: "",
//     alertEmail: "",
//     phoneNumber: "",
//     email: "", // Stores the logged-in user's email
//   });

//   // Load email from localStorage on component mount
//   useEffect(() => {
//     const storedEmail = localStorage.getItem("email");
//     if (storedEmail) {
//       setAmbulance((prev) => ({ ...prev, email: storedEmail }));
//     }
//   }, []);

//   const handleChange = (e) => {
//     setAmbulance({ ...ambulance, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/ambulance/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(ambulance),
//       });
//       const data = await res.json();
//       if (data.status === "success") {
//         alert("Ambulance registered successfully!");
//       } else {
//         alert(data.message || "Registration failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Error registering ambulance:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div>
//         <AmbulanceNavbar/>
//       <h2>Ambulance Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="place"
//           placeholder="Place"
//           value={ambulance.place}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="ambulanceNumber"
//           placeholder="Ambulance Number"
//           value={ambulance.ambulanceNumber}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="hospitalName"
//           placeholder="Hospital Name"
//           value={ambulance.hospitalName}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="alertEmail"
//           placeholder="Alert Email"
//           value={ambulance.alertEmail}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="tel"
//           name="phoneNumber"
//           placeholder="Phone Number"
//           value={ambulance.phoneNumber}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default AmbulanceRegister;



import React, { useState, useEffect } from "react";
import AmbulanceNavbar from "./Navbar";
import styles from "../../css/AmbulanceRegister.module.css";
import { FaAmbulance, FaHospital, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const AmbulanceRegister = () => {
  const [ambulance, setAmbulance] = useState({
    place: "",
    ambulanceNumber: "",
    hospitalName: "",
    alertEmail: "",
    phoneNumber: "",
    email: "",
  });

  const [message, setMessage] = useState({ text: "", isError: false });

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setAmbulance((prev) => ({ ...prev, email: storedEmail }));
    }
  }, []);

  const handleChange = (e) => {
    setAmbulance({ ...ambulance, [e.target.name]: e.target.value });
    setMessage({ text: "", isError: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/ambulance/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ambulance),
      });
      const data = await res.json();
      if (data.status === "success") {
        setMessage({ text: "Ambulance registered successfully!", isError: false });
        // Reset form
        setAmbulance({
          place: "",
          ambulanceNumber: "",
          hospitalName: "",
          alertEmail: "",
          phoneNumber: "",
          email: localStorage.getItem("email") || "",
        });
      } else {
        setMessage({ text: data.message || "Registration failed. Try again.", isError: true });
      }
    } catch (error) {
      console.error("Error registering ambulance:", error);
      setMessage({ text: "An error occurred. Please try again.", isError: true });
    }
  };

  return (

    <div>
      <AmbulanceNavbar />
      <div className={styles.container}>

        <div className={styles.header}>
          <h2>Ambulance Registration</h2>
          <p>Register your ambulance service with our emergency response system</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.inputGroup}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <FaMapMarkerAlt style={{ marginRight: '0.5rem' }} />
                Place
                <span className={styles.requiredIndicator}>*</span>
              </label>
              <input
                className={styles.formInput}
                type="text"
                name="place"
                placeholder="e.g. Main City Hospital"
                value={ambulance.place}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <FaAmbulance style={{ marginRight: '0.5rem' }} />
                Ambulance Number
                <span className={styles.requiredIndicator}>*</span>
              </label>
              <input
                className={styles.formInput}
                type="text"
                name="ambulanceNumber"
                placeholder="e.g. AMB-2023-001"
                value={ambulance.ambulanceNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <FaHospital style={{ marginRight: '0.5rem' }} />
                Hospital Name
                <span className={styles.requiredIndicator}>*</span>
              </label>
              <input
                className={styles.formInput}
                type="text"
                name="hospitalName"
                placeholder="e.g. City General Hospital"
                value={ambulance.hospitalName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <FaEnvelope style={{ marginRight: '0.5rem' }} />
                Alert Email
                <span className={styles.requiredIndicator}>*</span>
              </label>
              <input
                className={styles.formInput}
                type="email"
                name="alertEmail"
                placeholder="e.g. alerts@hospital.com"
                value={ambulance.alertEmail}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              <FaPhone style={{ marginRight: '0.5rem' }} />
              Phone Number
              <span className={styles.requiredIndicator}>*</span>
            </label>
            <input
              className={styles.formInput}
              type="tel"
              name="phoneNumber"
              placeholder="e.g. +1234567890"
              value={ambulance.phoneNumber}
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
            Register Ambulance
          </button>
        </form>
      </div>
    </div>


  );
};

export default AmbulanceRegister;