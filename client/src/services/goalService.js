// src/services/goalService.js

import {
    createGoal,
    getGoals,
    updateGoalProgress,
    markGoalCompleted
} from './api';

// Function to handle creating a new goal
export const createNewGoal = async (goalData) => {
    try {
        const response = await createGoal(goalData);
        return response; // Returns the created goal data
    } catch (error) {
        console.error('Error creating goal:', error.message);
        throw new Error('Failed to create goal.');
    }
};

// Function to retrieve all goals for the user
export const fetchGoals = async () => {
    try {
        const response = await getGoals();
        return response; // Returns the list of goals
    } catch (error) {
        console.error('Error fetching goals:', error.message);
        throw new Error('Failed to fetch goals.');
    }
};

// Function to update the progress of a specific goal
export const updateProgress = async (goalId) => {
    try {
        const response = await updateGoalProgress(goalId);
        return response; // Returns the updated goal data
    } catch (error) {
        console.error('Error updating goal progress:', error.message);
        throw new Error('Failed to update goal progress.');
    }
};

// Function to mark a goal as completed
export const completeGoal = async (goalId) => {
    try {
        const response = await markGoalCompleted(goalId);
        return response; // Returns the updated goal data
    } catch (error) {
        console.error('Error marking goal as completed:', error.message);
        throw new Error('Failed to mark goal as completed.');
    }
};
