const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Please add a rating between 1 and 5"],
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    note: {
      type: mongoose.Schema.ObjectId,
      ref: "Note",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting more than one rating per note
ratingSchema.index({ note: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Rating", ratingSchema);
