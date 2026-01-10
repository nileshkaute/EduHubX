const express = require("express");
const router = express.Router();
const {
  googleAuth,
  registerUser,
  loginUser,
} = require("../controllers/authController");

router.post("/google", googleAuth);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
