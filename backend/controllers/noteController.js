const Note = require("../models/Note");
const Rating = require("../models/Rating");

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
exports.getAllNotes = async (req, res) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit", "search"];
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Finding resource
    query = Note.find(JSON.parse(queryStr));

    // Handle Search
    if (req.query.search) {
      query = query.find({
        title: { $regex: req.query.search, $options: "i" },
      });
    }

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Note.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Populate
    query = query.populate({
      path: "uploadedBy",
      select: "name photo",
    });

    const notes = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: notes.length,
      pagination,
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

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
exports.updateNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: note });
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

// @desc    Rate a note
// @route   POST /api/notes/:id/rate
// @access  Private
exports.rateNote = async (req, res) => {
  try {
    const { rating } = req.body;
    const noteId = req.params.id;
    const userId = req.user.id;

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ success: false, message: "Provide a rating between 1 and 5" });
    }

    // Update or create rating
    await Rating.findOneAndUpdate(
      { user: userId, note: noteId },
      { rating },
      { upsert: true, new: true }
    );

    // Recalculate average rating for the note
    const ratings = await Rating.find({ note: noteId });
    const avgRating =
      ratings.reduce((acc, item) => acc + item.rating, 0) / ratings.length;

    const note = await Note.findByIdAndUpdate(
      noteId,
      {
        avgRating: avgRating.toFixed(1),
        ratingsCount: ratings.length,
      },
      { new: true }
    );

    res.status(200).json({ success: true, data: note });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
