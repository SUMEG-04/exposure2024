// controllers/goalController.js

const Goal = require('../models/Goal');
const Problem = require('../models/Problem');

// Create a new goal
exports.createGoal = async (req, res) => {
    try {
        const { targetProblems, difficultyLevel, deadline } = req.body;

        // Input validation
        if (!targetProblems || !difficultyLevel || !deadline) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const goal = new Goal({
            user: req.user.id,
            targetProblems,
            difficultyLevel,
            deadline
        });

        await goal.save();
        res.status(201).json(goal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get user's goals
exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(goals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update goal progress (this could be called after syncing problems)
exports.updateGoalProgress = async (req, res) => {
    try {
        const { goalId } = req.params;

        let goal = await Goal.findOne({ _id: goalId, user: req.user.id });
        if (!goal) {
            return res.status(404).json({ msg: 'Goal not found' });
        }

        // Calculate progress based on problems solved matching the goal criteria
        const problemsSolved = await Problem.countDocuments({
            user: req.user.id,
            difficulty: goal.difficultyLevel,
            completionDate: { $gte: goal.createdAt, $lte: goal.deadline }
        });

        goal.progress = problemsSolved;

        // Check if goal is completed
        if (goal.progress >= goal.targetProblems) {
            goal.completed = true;
        }

        await goal.save();
        res.json(goal);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Goal not found' });
        }
        res.status(500).send('Server error');
    }
};

// Mark goal as completed manually (if needed)
exports.markGoalCompleted = async (req, res) => {
    try {
        const { goalId } = req.params;

        let goal = await Goal.findOne({ _id: goalId, user: req.user.id });
        if (!goal) {
            return res.status(404).json({ msg: 'Goal not found' });
        }

        goal.completed = true;
        await goal.save();
        res.json(goal);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Goal not found' });
        }
        res.status(500).send('Server error');
    }
};
