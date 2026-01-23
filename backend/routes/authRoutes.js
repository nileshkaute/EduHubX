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
  uploadAvatar,
} = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/google", googleAuth);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/profile", protect, updateUserProfile);
router.post("/upload-avatar", protect, upload.single("poster"), uploadAvatar); // Reusing 'poster' field or add 'avatar' to middleware
router.get("/stats", protect, getDashboardStats);
router.get("/admin/stats", protect, authorize("admin"), getAdminStats);

module.exports = router;
