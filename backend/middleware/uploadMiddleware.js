const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directories exist
const uploadDir = "uploads";
const pdfDir = "uploads/pdfs";
const posterDir = "uploads/posters";

[uploadDir, pdfDir, posterDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "pdf") {
      cb(null, pdfDir);
    } else {
      cb(null, posterDir);
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "pdf") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  } else if (file.fieldname === "poster") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for posters!"), false);
    }
  } else {
    cb(new Error("Unknown field!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: fileFilter,
});

module.exports = upload;
