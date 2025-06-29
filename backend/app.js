const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const nodemailer = require("nodemailer");

const fs = require("fs");
const path = require("path");


const { usermodel } = require("./models/Users");
const { ambulancemodel } = require("./models/Ambulance");
const { cameramodel } = require("./models/Camera");
const {LiveAccident} = require("./models/LiveAccidents");


const app = express();
app.use(cors());
app.use(express.json());

// ✅ Correct Mongoose Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// ✅ API for Sign Up
app.post("/signup", async (req, res) => {
  try {
    let input = req.body;
    input.password = await generatePassword(input.password);

    let user = new usermodel(input);
    await user.save();

    res.json({ status: "success" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// ✅ API for Sign In
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: "error", message: "Incorrect password" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      status: "success",
      userid: user._id,
      token,
      name: user.name,
      email: user.email,
      usertype: user.usertype,
    });

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// 🚑 ✅ API: Ambulance Registration
app.post("/ambulance/register", async (req, res) => {
  try {
    const { email, place, ambulanceNumber, hospitalName, alertEmail, phoneNumber } = req.body;

    // ✅ Fix: Use `ambulancemodel.findOne(...)`
    const existingAmbulance = await ambulancemodel.findOne({ ambulanceNumber });
    if (existingAmbulance) {
      return res.status(400).json({ status: "error", message: "Ambulance already registered" });
    }

    // ✅ Save ambulance details
    const newAmbulance = new ambulancemodel({
      email,
      place,
      ambulanceNumber,
      hospitalName,
      alertEmail,
      phoneNumber,
    });

    await newAmbulance.save();

    res.json({ status: "success", message: "Ambulance registered successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// 🚨 API: Camera Registration for Camera Owner
app.post("/camera/register", async (req, res) => {
    try {
      const { email, location, cameraId, cameraModel, ipAddress, phoneNumber } = req.body;
  
      // Check if the camera is already registered (by cameraId)
      const existingCamera = await cameramodel.findOne({ cameraId });
      if (existingCamera) {
        return res.status(400).json({ status: "error", message: "Camera already registered" });
      }
  
      // Create and save a new camera registration
      const newCamera = new cameramodel({
        email,
        location,
        cameraId,
        cameraModel,
        ipAddress,
        phoneNumber,
      });
  
      await newCamera.save();
  
      res.json({ status: "success", message: "Camera registered successfully" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  });
  
// GET /camera/all?email=owner@example.com
app.get("/camera/all", async (req, res) => {
    try {
      const { email } = req.query;
      const cameras = await cameramodel.find({ email });
      res.json({ status: "success", data: cameras });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  });

  
  // DELETE /camera/delete/:id
app.delete("/camera/delete/:id", async (req, res) => {
    try {
      await cameramodel.findByIdAndDelete(req.params.id);
      res.json({ status: "success", message: "Camera deleted successfully" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  });
  
// PUT /camera/update/:id
app.put("/camera/update/:id", async (req, res) => {
    try {
      await cameramodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ status: "success", message: "Camera updated successfully" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  });
  
  app.get("/cameracontrol/all", async (req, res) => {
    try {
      const { email } = req.query;
      const cameras = await cameramodel.find({ email });
      res.json({ status: "success", data: cameras });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  });



app.post("/live-accidents", async (req, res) => {
  try {
    const { cameraId, accidentClip } = req.body;

    if (!cameraId || !accidentClip) {
      return res.status(400).json({ error: "cameraId and accidentClip are required" });
    }


    //Fetch Camera Details to get location
    const camera = await cameramodel.findOne({ cameraId });
    if (!camera) {
      return res.status(404).json({ error: "Camera not found" });
    }
    const { location } = camera; // Get location from camera model
    
    const cleanedAccidentClip = accidentClip.replace(/^\//, "");
    const clipPath = cleanedAccidentClip;

    //Check if the accident clip file exists
    if (!fs.existsSync(clipPath)) {
      return res.status(404).json({ error: "Accident clip not found on server." });
    }

    // Fetch all ambulance drivers from the database
    const ambulances = await ambulancemodel.find({});
    if (ambulances.length === 0) {
      console.log("No registered ambulances found.");
    } else {
      // Configure Nodemailer Transporter using your Gmail app password
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "gloriamcaproject@gmail.com",
          pass: "icta fmvr yzeo zcag" // Replace with your actual app password
        }
      });

      // Prepare and send email alerts with the accident clip attached
      const emailPromises = ambulances.map((ambulance) => {


        const mailOptions = {
          from: '"Accident Alert System" <gloriamcaproject@gmail.com>',
          to: ambulance.alertEmail,
          subject: "🚨 URGENT: Accident Alert - Immediate Response Needed!",
          html: `
            <div style="font-family: Arial, sans-serif; border: 2px solid #ff4d4d; padding: 20px; border-radius: 10px;">
              <h2 style="color: #ff4d4d; text-align: center;">🚨 EMERGENCY ALERT 🚨</h2>
              <p style="font-size: 16px; color: #333;">
                <strong>Dear Emergency Responder,</strong>
              </p>
              <p style="font-size: 16px; color: #333;">
                An accident has been detected at: <br>
                <strong style="color: #ff4d4d; font-size: 18px;">${location}</strong>
              </p>
              <p style="font-size: 16px; color: #333;">
                Please respond immediately. Your quick action can save lives!
              </p>
              <p>
                📍 <strong>View Location:</strong> 
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}" 
                  target="_blank" style="color: #1a73e8; text-decoration: none;">
                  Click here to open in Google Maps
                </a>
              </p>
              <p style="font-size: 16px; color: #333;">
                🔗 <strong>Accident Clip:</strong> Attached below
              </p>
              <div style="text-align: center; margin-top: 20px;">
                <p style="font-size: 16px; color: #ff4d4d;"><strong>⚠️ Please act immediately! ⚠️</strong></p>
              </div>
              <hr>
              <p style="font-size: 14px; text-align: center; color: #777;">
                🚑 <strong>Accident Detection System</strong> | Emergency Response Unit <br>
                Contact: <a href="mailto:support@accidentalert.com" style="color: #1a73e8;">support@accidentalert.com</a>
              </p>
            </div>
          `,
          attachments: [
            {
              filename: "AccidentClip.mp4",
              path: clipPath,
              contentType: "video/mp4"
            }
          ]
        };
        
        return transporter.sendMail(mailOptions);
      });


      await Promise.all(emailPromises);
      console.log(`🚑 Alerts with attachments sent to ${ambulances.length} ambulance drivers.`);
    }

    // Save Accident Details in MongoDB
    const newAccident = new LiveAccident({
      cameraId,
      accidentClip,
      timestamp: new Date()
    });

    await newAccident.save();
    console.log("✅ Accident saved successfully:", newAccident);

    res.status(200).json({ message: "Accident recorded and alerts sent successfully" });
  } catch (error) {
    console.error("🔥 Error handling accident:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});






app.get('/alert-details', async (req, res) => {
  try {
    // Fetch all alerts and sort by timestamp (most recent first)
    const alerts = await LiveAccident.find({}).sort({ timestamp: -1 });
    res.status(200).json(alerts);
  } catch (error) {
    console.error('Error fetching alert details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/accident-clips', async (req, res) => {
  const { cameraId } = req.query;
  try {
    const clips = await LiveAccident.find({ cameraId });
    res.status(200).json(clips);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch accident clips' });
  }
});



// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
