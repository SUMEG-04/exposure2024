const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    // Optionally, you can store linked accounts from coding platforms like LeetCode
    linkedAccounts: {
        leetcode: {
            type: String,
            trim: true
        },
        codeforces: {
            type: String,
            trim: true
        }
        // Add more platform fields as necessary
    },
    // Timestamps for user creation and updates
}, { timestamps: true });

// Pre-save hook to hash password before saving to the database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to check password match
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
