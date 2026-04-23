const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/authmiddleware");

const {
  createBooking,
  myBookings,
  pendingBookings,
  acceptBooking,
  updateStatus
} = require("../controllers/bookingcontrollers");

router.post("/", protect, authorize("user"), createBooking);
router.get("/my", protect, authorize("user"), myBookings);

router.get("/pending", protect, authorize("driver"), pendingBookings);
router.patch("/:id/accept", protect, authorize("driver"), acceptBooking);
router.patch("/:id/status", protect, authorize("driver"), updateStatus);

module.exports = router;