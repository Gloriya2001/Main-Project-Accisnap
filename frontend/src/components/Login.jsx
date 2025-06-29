
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Login.module.css";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (data.status === "success") {
        // Store token, name, email, and usertype in local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("usertype", data.usertype);

        // Redirect based on usertype
        if (data.usertype === "ambulance") {
          navigate("/ambulance/dashboard");
        } else if (data.usertype === "camera-owner") {
          navigate("/camera-owner/dashboard");
        }
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.loginTitle}>Welcome Back</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
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
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <div className={styles.forgotPassword}>
          <a href="/forgot-password">Forgot password?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;