// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   POST api/users/register
// @desc    Register user
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
    ],
    userController.registerUser
);

// @route   POST api/users/login
// @desc    Authenticate user & get token
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    userController.loginUser
);

// @route   GET api/users/profile
// @desc    Get user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

// @route   PUT api/users/profile
// @desc    Update user profile
router.put('/profile', authMiddleware, userController.updateUserProfile);

module.exports = router;
