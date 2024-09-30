// src/services/problemService.js

import {
    syncProblems,
    getProblems,
    updateProblem
} from './api';

// Function to sync problems from coding platforms
export const syncUserProblems = async () => {
    try {
        const response = await syncProblems();
        return response; // Returns the success message or data from the backend
    } catch (error) {
        console.error('Error syncing problems:', error.message);
        throw new Error('Failed to sync problems.');
    }
};

// Function to retrieve all solved problems for the user
export const fetchUserProblems = async () => {
    try {
        const response = await getProblems();
        console.log(response);
        return response; // Returns the list of solved problems
    } catch (error) {
        console.error('Error fetching user problems:', error.message);
        throw new Error('Failed to fetch user problems.');
    }
};

// Function to update a specific problem's details (e.g., notes or tags)
export const updateUserProblem = async (problemId, updates) => {
    try {
        const response = await updateProblem(problemId, updates);
        return response; // Returns the updated problem data
    } catch (error) {
        console.error('Error updating problem:', error.message);
        throw new Error('Failed to update problem.');
    }
};
