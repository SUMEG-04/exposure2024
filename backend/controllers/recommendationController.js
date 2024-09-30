// controllers/recommendationController.js

const { recommendProblems } = require('../services/recommendationService');

// Get recommendations for the user
exports.getRecommendations = async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the request
        const recommendations = await recommendProblems(userId);
        
        res.json(recommendations);
    } catch (err) {
        console.error('Error fetching recommendations:', err.message);
        res.status(500).send('Server error');
    }
};
