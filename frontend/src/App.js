import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AmbulanceDashboard from "./components/ambulance/Dashboard";
import CameraOwnerDashboard from "./components/camera-owner/Dashboard";
import AmbulanceRegister from "./components/ambulance/Register";
import AmbulanceNavbar from "./components/ambulance/Navbar";
import CameraOwnerNavbar from "./components/camera-owner/Navbar";
import CameraRegister from "./components/camera-owner/CamraRegister";
import CameraList from "./components/camera-owner/CameraList";
import ControlPanel from "./components/camera-owner/ControlPanel";
import AccidentClips from "./components/camera-owner/AccidentClips";
import AlertDetails from "./components/ambulance/AlertDetails";
import UploadVideo from "./components/camera-owner/UploadVideo";
import Home from "./components/Home";
import Profile from "./components/ambulance/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/ambulance/dashboard" element={<AmbulanceDashboard />} />
        <Route path="/ambulance/register" element={<AmbulanceRegister />} />
        <Route path="/ambulance/navbar" element={<AmbulanceNavbar />} />
        <Route path="/ambulance/alert-details" element={<AlertDetails />} />
        <Route path="/ambulance/profile" element={<Profile />} />

        <Route
          path="/camera-owner/dashboard"
          element={<CameraOwnerDashboard />}
        />
        <Route path="/camera-owner/navbar" element={<CameraOwnerNavbar />} />
        <Route
          path="/camera-owner/camera-register"
          element={<CameraRegister />}
        />
        <Route path="/camera-owner/camera-list" element={<CameraList />} />
        <Route path="/camera-owner/control-panel" element={<ControlPanel />} />
        <Route
          path="/camera-owner/accident-clips"
          element={<AccidentClips />}
        />
        <Route path="/camera-owner/upload-video" element={<UploadVideo />} />
      </Routes>
    </Router>
  );
}

export default App;
