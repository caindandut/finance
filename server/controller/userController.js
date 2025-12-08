const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const AppError = require('../utils/appError');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.send('Register Route');
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
   res.send('Login Route');
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
   res.send('Profile Route');
});

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
};