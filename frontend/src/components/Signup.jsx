// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [user, setUser] = useState({ name: "", email: "", password: "" ,usertype: ""});
//   const navigate = useNavigate();

//   const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch("http://localhost:5000/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user),
//     });
//     const data = await res.json();
//     if (data.status === "success") navigate("/login");
//     else alert("Signup failed");
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <input type="usertype" name="usertype" placeholder="usertype" onChange={handleChange} required />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Signup.module.css";

const Signup = () => {
  const [user, setUser] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    usertype: "" 
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (data.status === "success") {
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <h2 className={styles.signupTitle}>Create Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className={styles.inputField}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className={styles.inputField}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.inputField}
          onChange={handleChange}
          required
        />
        <select
          name="usertype"
          className={styles.selectField}
          onChange={handleChange}
          required
          value={user.usertype}
        >
          <option value="">Select User Type</option>
          <option value="ambulance">Ambulance</option>
          <option value="camera-owner">Camera Owner</option>
        </select>
        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <div className={styles.loginLink}>
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;