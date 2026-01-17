const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a note title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    subject: {
      type: String,
      required: [true, "Please add a subject"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    pdfUrl: {
      type: String,
      required: [true, "Please upload a PDF file"],
    },
    posterUrl: {
      type: String,
      default: "https://via.placeholder.com/300x400?text=Notes+Poster",
    },
    uploadedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
    // Customization Fields
    bottomColor: {
      type: String,
      default: "#ff5722", // Default Orange
    },
    titleColor: {
      type: String,
      default: "#1f2937", // Default Gray-900
    },
    textColor: {
      type: String,
      default: "#4b5563", // Default Gray-600
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
