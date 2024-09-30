// controllers/problemController.js

const Problem = require('../models/Problem');
const User = require('../models/User');
const scrapingService = require('../services/scrapingService'); // Service to handle web scraping
const { recommendProblems } = require('../services/recommendationService');

// Sync problems from coding platforms
exports.syncProblems = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user.linkedAccounts || !user.linkedAccounts.leetcode) {
            return res.status(400).json({ msg: 'Linked coding platform account required' });
        }

        // Use scraping service to get solved problems
        const solvedProblems = await scrapingService.getSolvedProblems(user.linkedAccounts.leetcode);

        // Save or update problems in the database
        for (let problemData of solvedProblems) {
            // Check if problem already exists
            let problem = await Problem.findOne({
                user: req.user.id,
                title: problemData.title,
                platform: problemData.platform
            });

            if (!problem) {
                // Create new problem entry
                problem = new Problem({
                    user: req.user.id,
                    ...problemData
                });
                await problem.save();
            }
        }

        res.json({ msg: 'Problems synced successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get list of problems solved by the user
exports.getProblems = async (req, res) => {
    try {
        const problems = await Problem.find({ user: req.user.id }).sort({ completionDate: -1 });
        res.json(problems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Add notes or tags to a problem
exports.updateProblem = async (req, res) => {
    try {
        const { problemId } = req.params;
        const { notes, tags } = req.body;

        let problem = await Problem.findOne({ _id: problemId, user: req.user.id });
        if (!problem) {
            return res.status(404).json({ msg: 'Problem not found' });
        }

        if (notes) problem.notes = notes;
        if (tags) problem.tags = tags;

        await problem.save();
        res.json(problem);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Problem not found' });
        }
        res.status(500).send('Server error');
    }
};

