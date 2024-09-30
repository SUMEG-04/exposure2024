// routes/recommendationRoutes.js

const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   GET api/recommendations
// @desc    Get personalized problem recommendations for the user
// @access  Private
router.get('/', authMiddleware, recommendationController.getRecommendations);

module.exports = router;
