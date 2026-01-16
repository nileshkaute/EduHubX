const Note = require("../models/Note");

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
exports.getAllNotes = async (req, res) => {
  try {
    const { subject, search } = req.query;
    let query = {};

    if (subject) {
      query.subject = subject;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const notes = await Note.find(query).populate({
      path: "uploadedBy",
      select: "name photo",
    });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Public
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate({
      path: "uploadedBy",
      select: "name photo bio",
    });

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, data: note });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Create new note
// @route   POST /api/notes
// @access  Private
exports.createNote = async (req, res) => {
  try {
    // Add user to req.body
    req.body.uploadedBy = req.user.id;

    // Handle files if uploaded
    if (req.files) {
      if (req.files.pdf) {
        req.body.pdfUrl = `${req.protocol}://${req.get("host")}/uploads/pdfs/${
          req.files.pdf[0].filename
        }`;
      }
      if (req.files.poster) {
        req.body.posterUrl = `${req.protocol}://${req.get(
          "host"
        )}/uploads/posters/${req.files.poster[0].filename}`;
      }
    }

    const note = await Note.create(req.body);

    res.status(201).json({ success: true, data: note });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    // Make sure user is note owner or admin
    if (
      note.uploadedBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this note",
      });
    }

    await note.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Increment download count
// @route   PUT /api/notes/:id/download
// @access  Public/Private
exports.incrementDownloads = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    note.downloads += 1;
    await note.save();

    res.status(200).json({ success: true, data: note });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
