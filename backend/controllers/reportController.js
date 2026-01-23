const Report = require("../models/Report");
const Note = require("../models/Note");

// @desc    Create a new report
// @route   POST /api/reports/:noteId
// @access  Private
const createReport = async (req, res) => {
  try {
    const { reason, description } = req.body;
    const noteId = req.params.noteId;
    const userId = req.user._id;

    // Check if report already exists from this user for this note
    const existingReport = await Report.findOne({
      note: noteId,
      reportedBy: userId,
    });

    if (existingReport) {
      return res
        .status(400)
        .json({ message: "You have already reported this note" });
    }

    const report = await Report.create({
      note: noteId,
      reportedBy: userId,
      reason,
      description,
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all reports (Admin only)
// @route   GET /api/reports
// @access  Private/Admin
const getReports = async (req, res) => {
  try {
    const reports = await Report.find({})
      .populate("note", "title subject uploadedBy")
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update report status (Admin only)
// @route   PUT /api/reports/:id
// @access  Private/Admin
const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = status;
    await report.save();

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createReport,
  getReports,
  updateReportStatus,
};
