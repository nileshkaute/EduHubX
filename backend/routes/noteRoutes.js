const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  incrementDownloads,
  rateNote,
} = require("../controllers/noteController");

const { protect, authorize } = require("../middleware/authMiddleware");
const { isNoteOwner } = require("../middleware/ownershipMiddleware");
const upload = require("../middleware/uploadMiddleware");

router
  .route("/")
  .get(getAllNotes)
  .post(
    protect,
    upload.fields([
      { name: "pdf", maxCount: 1 },
      { name: "poster", maxCount: 1 },
    ]),
    createNote
  );

router
  .route("/:id")
  .get(getNoteById)
  .put(protect, authorize("admin"), updateNote)
  .delete(protect, authorize("admin"), deleteNote);

router.route("/:id/download").put(incrementDownloads);
router.route("/:id/rate").post(protect, rateNote);

module.exports = router;
