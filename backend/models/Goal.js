const mongoose = require('mongoose');

// Goal Schema
const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetProblems: {
        type: Number,        // Number of problems user wants to solve
        required: true,
        min: 1
    },
    difficultyLevel: {
        type: String,        // Easy, Medium, Hard
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    deadline: {
        type: Date,          // Goal deadline (e.g., one week from now)
        required: true
    },
    progress: {
        type: Number,        // How many problems have been solved so far
        default: 0
    },
    completed: {
        type: Boolean,       // Mark goal as complete or not
        default: false
    }
}, { timestamps: true });

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;
