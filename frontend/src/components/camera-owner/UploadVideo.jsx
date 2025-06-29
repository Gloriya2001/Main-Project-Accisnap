import React, { useState } from "react";
import axios from "axios";

const UploadVideo = () => {
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState("");
  const email = localStorage.getItem("email");

  const handleFileChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!video) {
      alert("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("email", email);

    try {
      const response = await axios.post("http://localhost:8080/upload-video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error uploading video:", error);
      setMessage("Failed to upload video.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Video for Accident Detection</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Detect Accident
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadVideo;




