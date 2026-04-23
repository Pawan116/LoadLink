const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  vehicleNumber: String,
  truckType: String,
  isAvailable: { type: Boolean, default: true }
},
{ timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);