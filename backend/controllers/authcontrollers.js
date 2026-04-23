const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const Driver = require("../models/drivers");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};



// USER REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      phone,
    });

    res.status(201).json({
      token: generateToken(user._id, "user"),
      user,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



// USER LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    res.json({
      token: generateToken(user._id, "user"),
      user,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



// DRIVER REGISTER
exports.registerDriver = async (req, res) => {
  try {
    const { name, email, password, phone, vehicleNumber, truckType } = req.body;

    const exists = await Driver.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Driver already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const driver = await Driver.create({
      name,
      email,
      password: hashed,
      phone,
      vehicleNumber,
      truckType,
    });

    res.status(201).json({
      token: generateToken(driver._id, "driver"),
      driver,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



// DRIVER LOGIN
exports.loginDriver = async (req, res) => {
  try {
    const { email, password } = req.body;

    const driver = await Driver.findOne({ email });
    if (!driver) return res.status(404).json({ msg: "Driver not found" });

    const match = await bcrypt.compare(password, driver.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    res.json({
      token: generateToken(driver._id, "driver"),
      driver,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};