const mongoose = require("mongoose");

const cameraSchema = new mongoose.Schema({
  email: { type: String, required: true }, // Camera owner's email (from login)
  location: { type: String, required: true }, // Where the camera is installed
  cameraId: { type: String, required: true, unique: true }, // Unique camera identifier
  cameraModel: { type: String, required: true }, // Camera model name/number
  ipAddress: { type: String, required: true }, // ipAddress of Camera
  phoneNumber: { type: String, required: true }  // Contact number for alerts
});

const cameramodel = mongoose.model("cameras", cameraSchema);
module.exports = { cameramodel };
