// services/recommendationService.js

const Problem = require('../models/Problem');

// Function to recommend problems based on the user's solved problems
const recommendProblems = async (userId) => {
    try {
        // Fetch solved problems by the user
        const solvedProblems = await Problem.find({ user: userId });

        if (solvedProblems.length === 0) {
            return []; // No recommendations available if no problems solved
        }

        // Analyze the user's solved problems
        const problemDifficulties = solvedProblems.map(problem => problem.difficulty);
        const problemTitles = solvedProblems.map(problem => problem.title);
        
        // Determine the most common difficulty level among solved problems
        const difficultyCount = {};
        problemDifficulties.forEach(difficulty => {
            difficultyCount[difficulty] = (difficultyCount[difficulty] || 0) + 1;
        });

        // Find the difficulty with the maximum count
        const recommendedDifficulty = Object.keys(difficultyCount).reduce((a, b) => 
            difficultyCount[a] > difficultyCount[b] ? a : b
        );

        // Find problems that match the recommended difficulty but are not already solved
        const recommendedProblems = await Problem.find({
            user: { $ne: userId }, // Exclude the user's solved problems
            difficulty: recommendedDifficulty,
            title: { $nin: problemTitles } // Exclude already solved problems
        }).limit(5); // Limit the number of recommendations

        return recommendedProblems.map(problem => ({
            title: problem.title,
            difficulty: problem.difficulty,
            platform: problem.platform
        }));
    } catch (err) {
        console.error('Error generating recommendations:', err.message);
        throw new Error('Failed to generate recommendations.');
    }
};

// Export the recommendation function
module.exports = {
    recommendProblems
};
