const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.services");
const BlacklistToken = require("../models/blacklistToken.model");

module.exports.createCaptain = async (req, res) => {
  try { const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });}

    const {fullName: { firstName, lastName }, email, password, vehicle: { color, plate, capacity, vehicleType },} = req.body;

    const existingCaptain = await captainService.findOne({ email });
    if (existingCaptain) {
      return res.status(409).json({
        success: false,
        message: "Captain with this email already exists",
      });
    }

    const hashPassword = await captainModel.hashPassword(password);

    const captainData = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password: hashPassword,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    };

    const newCaptain = await captainService.create(captainData);

    // Generate auth token for the new captain
    const token = newCaptain.generateAuthToken();

    return res.status(201).json({
      success: true,
      message: "Captain created successfully",
      data: {
        captain: {
          _id: newCaptain._id,
          fullName: newCaptain.fullName,
          email: newCaptain.email,
          vehicle: newCaptain.vehicle,
          status: newCaptain.status,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Error creating captain:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = captain.generateAuthToken();

    // Set token in cookie (secure & httpOnly)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const { password: _, ...captainData } = captain.toObject();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      captain: captainData,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getCaptainProfile = async (req, res) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  try {
    // Clear the token from cookies
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: "No token found to log out" });
    }
    await BlacklistToken.create({ token });
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    if (typeof next === 'function') return next(error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};