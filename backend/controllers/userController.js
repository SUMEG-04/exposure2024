// controllers/userController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Make sure to set this in your .env file

// Register a new user
exports.registerUser = async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email, password } = req.body;
        console.log(req.body);

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User({
            name,
            email,
            password
        });

        // Save user to the database (password will be hashed via pre-save hook)
        await user.save();

        // Generate JWT token
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: '7d' }, // Token expires in 7 days
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login user
// In your UserController
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '7d' });

        res.cookie('jwtoken', token, {
            httpOnly: false,
            sameSite: 'none',
            secure: true, // Adjust as necessary
        });
        res.status(200).json({ user, token });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};



// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        // req.user is set in auth middleware after verifying JWT token
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update user profile (e.g., link coding platform accounts)
exports.updateUserProfile = async (req, res) => {
    try {
        const { name, linkedAccounts } = req.body;

        // Build update object
        let userFields = {};
        if (name) userFields.name = name;
        if (linkedAccounts) userFields.linkedAccounts = linkedAccounts;

        // Update user
        let user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: userFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
