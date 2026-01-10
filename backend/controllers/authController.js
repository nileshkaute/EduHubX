const User = require("../models/User");

// @desc    Auth with Google
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res) => {
  const { name, email, googleId, photo } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      // User exists, update googleId/photo if missing or changed
      user.googleId = googleId;
      user.photo = photo;
      await user.save();
      return res.json(user);
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        googleId,
        photo,
        password: "", // Password empty for Google users
      });
      return res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { googleAuth };
