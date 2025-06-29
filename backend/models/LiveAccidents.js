const mongoose = require("mongoose");

const liveAccidentSchema = new mongoose.Schema({
    cameraId: { type: String, required: true },
    accidentClip: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }, // Automatically records the current time
    accepted: { type: Boolean, default: false } // New field to track acceptance
});

const LiveAccident = mongoose.model("Liveaccident", liveAccidentSchema);
module.exports = { LiveAccident };
