const usermodel = require("../models/user.model");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  const hashedPassword = await usermodel.hashPassword(password);
const existingUser = await usermodel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User with this email already exists" });
  }
  try {
    const user = await userService.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();
    return res.status(201).json({ token, user });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token); // Set token in cookies
  return res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user)

};

module.exports.logoutUser = async (req, res, next) => {
  try {
    // Clear the token from cookies
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
if (!token) {
  return res.status(400).json({ message: "No token found to log out" });
}
await BlacklistToken.create({ token });

    res.clearCookie("token");

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
