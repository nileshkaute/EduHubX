const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const Note = require("../models/Note");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Auth with Google (Custom Backend)
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res) => {
  const { token } = req.body; // Token from frontend Google login

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, sub: googleId, picture: photo } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (user) {
      // Update googleId/photo if missing
      user.googleId = googleId;
      user.photo = photo;
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        googleId,
        photo,
        password: "", // Empty password for Google users
      });
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Google Auth Error", error: error.message });
  }
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please add all fields" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.photo = req.body.photo || user.photo;
      user.bio = req.body.bio || user.bio;
      user.education = req.body.education || user.education;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo,
        bio: updatedUser.bio,
        role: updatedUser.role,
        education: updatedUser.education,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/auth/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all notes by this user
    const notes = await Note.find({ uploadedBy: userId });

    const totalUploads = notes.length;
    const totalDownloads = notes.reduce((acc, note) => acc + note.downloads, 0);

    const notesWithRatings = notes.filter((n) => n.ratingsCount > 0);
    const avgRating =
      notesWithRatings.length > 0
        ? (
            notesWithRatings.reduce((acc, note) => acc + note.avgRating, 0) /
            notesWithRatings.length
          ).toFixed(1)
        : "N/A";

    res.json({
      success: true,
      data: {
        totalUploads,
        totalDownloads,
        avgRating,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get admin dashboard stats
// @route   GET /api/auth/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalNotes = await Note.countDocuments();

    const allNotes = await Note.find({});
    const totalDownloads = allNotes.reduce(
      (acc, note) => acc + note.downloads,
      0
    );

    res.json({
      success: true,
      data: {
        totalUsers,
        totalNotes,
        totalDownloads,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  googleAuth,
  registerUser,
  loginUser,
  updateUserProfile,
  getDashboardStats,
  getAdminStats,
  getMe,
};
