const model = require('../models/user.model');
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }
    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token is blacklisted' });
    }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await model.findById(decoded._id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }
  const blacklistToken = await BlacklistToken.findOne({ token });
  if (blacklistToken) {
    return res.status(400).json({ message: 'Token already blacklisted' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);

    req.captain = captain;
    return next();
  } catch (error) {
    console.error('Logout error:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}