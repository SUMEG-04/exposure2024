// routes/problemRoutes.js

const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');
const authMiddleware = require('../middlewares/authMiddleware');
const { check } = require('express-validator');

// @route   POST api/problems/sync
// @desc    Sync problems from coding platform account
// @access  Private
router.post('/sync', authMiddleware, problemController.syncProblems);

// @route   GET api/problems
// @desc    Get list of solved problems
// @access  Private
router.get('/', authMiddleware, problemController.getProblems);

// @route   PUT api/problems/:problemId
// @desc    Update problem details (add notes or tags)
// @access  Private
router.put(
    '/:problemId',
    [
        authMiddleware,
        [
            check('notes', 'Notes must be less than 500 characters').optional().isLength({ max: 500 }),
            check('tags', 'Tags must be an array').optional().isArray()
        ]
    ],
    problemController.updateProblem
);

module.exports = router;
