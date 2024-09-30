// routes/goalRoutes.js

const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const authMiddleware = require('../middlewares/authMiddleware');
const { check } = require('express-validator');

// @route   POST api/goals
// @desc    Create a new goal
// @access  Private
router.post(
    '/',
    [
        authMiddleware,
        [
            check('targetProblems', 'Target number of problems is required and must be a number').isInt({ min: 1 }),
            check('difficultyLevel', 'Difficulty level is required').isIn(['Easy', 'Medium', 'Hard']),
            check('deadline', 'Deadline is required and must be a valid date').isISO8601()
        ]
    ],
    goalController.createGoal
);

// @route   GET api/goals
// @desc    Get user's goals
// @access  Private
router.get('/', authMiddleware, goalController.getGoals);

// @route   PUT api/goals/:goalId/progress
// @desc    Update goal progress based on problems solved
// @access  Private
router.put('/:goalId/progress', authMiddleware, goalController.updateGoalProgress);

// @route   PUT api/goals/:goalId/completed
// @desc    Mark goal as completed manually
// @access  Private
router.put('/:goalId/completed', authMiddleware, goalController.markGoalCompleted);

module.exports = router;
