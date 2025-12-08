const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const AppError = require('../utils/appError');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
 // ... trong hàm registerUser
const { name, email, password } = req.body;

if (!name || !email || !password) {
  throw new AppError('Please add all fields', 400);
}

// Check if user exists
const userExists = await User.findOne({ email });
if (userExists) {
  throw new AppError('User already exists', 400);
}

// ... tiếp theo đoạn code trên
const user = await User.create({
  name,
  email,
  password,
});

if (user) {
  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
} else {
  throw new AppError('Invalid user data', 400);
}
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
   const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  // user.matchPassword là method ta đã viết ở Model ngày hôm qua
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    throw new AppError('Invalid email or password', 401);
  }
});
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  
  res.status(200).json(user);
});
});

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
};