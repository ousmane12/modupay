const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, login, phoneNumber, role, email, password } = req.body

  if (!firstName || !lastName || !login || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ phoneNumber })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    login,
    phoneNumber,
    role,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body

  // Check for user email
  const user = await User.findOne({ login })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// @desc    Get user data
// @route   GET /api/users/all
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users)
})

// @desc    Update user data
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, login, phoneNumber, email, role } = req.body;

  // Check if the user exists
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update user fields
  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.login = login || user.login;
  user.phoneNumber = phoneNumber || user.phoneNumber;
  user.email = email || user.email;
  user.role = role || user.role;

  // Save the updated user
  const updatedUser = await user.save();

  res.json(updatedUser);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  await user.remove()

  res.status(200).json({ id: req.params.id })
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  deleteUser,
  updateUser,
}