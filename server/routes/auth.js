const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role, skills } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email, and password"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
      skills: skills || []
    });

    // Generate token
    const token = generateToken(user._id);

    // Prepare user response (without password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      skills: user.skills,
      createdAt: user.createdAt
    };

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: userResponse
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({
      message: error.message || "Signup failed"
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password"
      });
    }

    // Find user and include password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Prepare user response (without password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      skills: user.skills,
      createdAt: user.createdAt
    };

    res.status(200).json({
      message: "Login successful",
      token,
      user: userResponse
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      message: error.message || "Login failed"
    });
  }
});

// GET CURRENT USER (Protected Route Example)
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    res.json({
      user
    });
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized"
    });
  }
});

module.exports = router;
