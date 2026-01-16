const express = require("express");
const router = express.Router();
const {
  googleAuth,
  registerUser,
  loginUser,
  updateUserProfile,
  getDashboardStats,
  getAdminStats,
  getMe,
} = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/google", googleAuth);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/profile", protect, updateUserProfile);
router.get("/stats", protect, getDashboardStats);
router.get("/admin/stats", protect, authorize("admin"), getAdminStats);

module.exports = router;
