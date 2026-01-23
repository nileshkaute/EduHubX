const express = require("express");
const router = express.Router();
const {
  createReport,
  getReports,
  updateReportStatus,
} = require("../controllers/reportController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/:noteId", protect, createReport);
router.get("/", protect, authorize("admin"), getReports);
router.put("/:id", protect, authorize("admin"), updateReportStatus);

module.exports = router;
