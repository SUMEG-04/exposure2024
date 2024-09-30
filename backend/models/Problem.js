const mongoose = require('mongoose');

// Problem Schema
const problemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    platform: {
        type: String,        // The platform where the problem was solved (e.g., LeetCode, Codeforces)
        required: true,
        enum: ['LeetCode', 'Codeforces', 'HackerRank', 'Other']
    },
    difficulty: {
        type: String,        // Easy, Medium, Hard
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    completionDate: {
        type: Date,          // Date the problem was completed
        default: Date.now,
        required: true
    },
    notes: {
        type: String,        // Optional notes the user might want to add
        trim: true
    },
    tags: {
        type: [String],      // Tags for categorization (e.g., "arrays", "binary search")
        default: []
    }
}, { timestamps: true });

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
