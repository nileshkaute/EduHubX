const express = require("express");
const {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  incrementDownloads,
} = require("../controllers/noteController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

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

router.route("/:id").get(getNoteById).delete(protect, deleteNote);

router.route("/:id/download").put(incrementDownloads);

module.exports = router;
