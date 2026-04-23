const Booking = require("../models/bookings");


// USER CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// USER MY BOOKINGS
exports.myBookings = async (req, res) => {
  try {
    const data = await Booking.find({ user: req.user.id }).populate("driver");
    res.json(data);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// DRIVER VIEW PENDING
exports.pendingBookings = async (req, res) => {
  try {
    const data = await Booking.find({ status: "Pending" }).populate("user");
    res.json(data);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// DRIVER ACCEPT
exports.acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    booking.driver = req.user.id;
    booking.status = "Accepted";

    await booking.save();

    res.json(booking);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// UPDATE STATUS
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    booking.status = status;

    await booking.save();

    res.json(booking);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};