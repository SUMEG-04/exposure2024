// src/services/recommendationService.js

import { getRecommendations } from './api';

// Function to fetch personalized problem recommendations for the user
export const fetchRecommendations = async () => {
    try {
        const response = await getRecommendations();
        return response; // Returns the list of recommended problems
    } catch (error) {
        console.error('Error fetching recommendations:', error.message);
        throw new Error('Failed to fetch recommendations.');
    }
};
