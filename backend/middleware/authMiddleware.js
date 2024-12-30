const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attache l'utilisateur au `req` basé sur le token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});

// Middleware for admin access
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

// Middleware for country manager access
const countryManager = (req, res, next) => {
  if (req.user && req.user.role === 'country_manager' || req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as a country manager or admin');
  }
};

// Middleware for agency manager access
const agencyManager = (req, res, next) => {
  if (req.user && req.user.role === 'agency_manager') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an agency manager');
  }
};

module.exports = { protect, admin, countryManager, agencyManager }