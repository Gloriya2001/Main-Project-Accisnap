const mongoose = require("mongoose");

const ambulanceSchema = new mongoose.Schema({
  place: { type: String, required: true },
  ambulanceNumber: { type: String, required: true, unique: true },
  hospitalName: { type: String, required: true },
  alertEmail: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
});

let ambulancemodel = mongoose.model("ambulances", ambulanceSchema);

module.exports = { ambulancemodel };
