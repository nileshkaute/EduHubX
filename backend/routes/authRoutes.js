const express = require("express");
const router = express.Router();
const {
  googleAuth,
  registerUser,
  loginUser,
  updateUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/google", googleAuth);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateUserProfile);

module.exports = router;
