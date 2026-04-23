const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  registerDriver,
  loginDriver,
} = require("../controllers/authcontrollers");

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

router.post("/drivers/register", registerDriver);
router.post("/drivers/login", loginDriver);

module.exports = router;