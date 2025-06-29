import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [ambulances, setAmbulances] = useState([]);
  const email = localStorage.getItem("email"); // Get logged-in user's email

  useEffect(() => {
    if (email) fetchAmbulances();
  }, [email]); // Run when email changes

  // ✅ Fetch ambulances registered by the logged-in user
  const fetchAmbulances = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/ambulances?userEmail=${email}`);
      setAmbulances(response.data);
    } catch (error) {
      console.error("Error fetching ambulance data:", error);
    }
  };

  // ✅ Edit Ambulance (Placeholder for modal or form)
  const handleEdit = (id) => {
    alert(`Edit ambulance with ID: ${id}`);
    // Implement edit functionality (e.g., open a modal with form)
  };

  // ✅ Delete Ambulance
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ambulance?")) {
      try {
        await axios.delete(`http://localhost:5000/ambulances/${id}`);
        setAmbulances(ambulances.filter((ambulance) => ambulance._id !== id));
      } catch (error) {
        console.error("Error deleting ambulance:", error);
      }
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Registered Ambulances</h2>

      {ambulances.length === 0 ? (
        <p>No ambulances registered yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ backgroundColor: "#333", color: "white" }}>
              <th>ID</th>
              <th>Driver Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Hospital</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ambulances.map((ambulance) => (
              <tr key={ambulance._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td>{ambulance._id}</td>
                <td>{ambulance.driverName}</td>
                <td>{ambulance.phone}</td>
                <td>{ambulance.email}</td>
                <td>{ambulance.hospital}</td>
                <td>
                  <button
                    style={{
                      marginRight: "10px",
                      padding: "5px 10px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: "#4CAF50",
                      color: "white",
                    }}
                    onClick={() => handleEdit(ambulance._id)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      padding: "5px 10px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: "red",
                      color: "white",
                    }}
                    onClick={() => handleDelete(ambulance._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Profile;
