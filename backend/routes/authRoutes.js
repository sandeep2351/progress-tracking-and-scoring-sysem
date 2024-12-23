const express = require('express');
const router = express.Router();
const { register, login, getUsers } = require('../Controllers/authController');

// Register and Login routes
router.post('/register', register);
router.post('/login', login);

// Admin-specific route for fetching all users
router.get('/users', getUsers);

module.exports = router;
