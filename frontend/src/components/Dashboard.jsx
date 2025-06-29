import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  // Retrieve user info from local storage
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const usertype = localStorage.getItem("usertype");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <h2>Camera owner Dashboard</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>usertype:</strong> {usertype}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
