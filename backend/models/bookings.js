const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    default: null
  },

  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  loadType: String,
  weight: String,
  truckType: String,

  status: {
    type: String,
    enum: ["Pending", "Accepted", "In Transit", "Completed"],
    default: "Pending"
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);