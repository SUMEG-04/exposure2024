// src/services/api.js

import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Update this to your backend base URL
});

// Intercept requests to add token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        if (token) {
            config.headers['x-auth-token'] = token; // Attach the token to the headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// User Authentication Endpoints
export const registerUser = async (userData) => {
    const response = await api.post('/users/register', userData);
    console.log(response.data);
    return response.data; // Returns the response data
};

export const loginUser = async (userData) => {
    const response = await api.post('/users/login', userData);
    return response.data; // Returns the response data
};

export const getUserProfile = async () => {
    const response = await api.get('/users/profile');
    return response.data; // Returns user profile data
};

export const updateUserProfile = async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data; // Returns updated user profile data
};

// Problem Management Endpoints
export const syncProblems = async () => {
    const response = await api.post('/problems/sync');
    return response.data; // Returns success message or data
};

export const getProblems = async () => {
    const response = await api.get('/problems');
    console.log(response);
    return response.data; // Returns list of solved problems
};

export const updateProblem = async (problemId, updates) => {
    const response = await api.put(`/problems/${problemId}`, updates);
    return response.data; // Returns updated problem data
};

// Goal Management Endpoints
export const createGoal = async (goalData) => {
    const response = await api.post('/goals', goalData);
    return response.data; // Returns created goal data
};

export const getGoals = async () => {
    const response = await api.get('/goals');
    return response.data; // Returns list of goals
};

export const updateGoalProgress = async (goalId) => {
    const response = await api.put(`/goals/${goalId}/progress`);
    return response.data; // Returns updated goal data
};

export const markGoalCompleted = async (goalId) => {
    const response = await api.put(`/goals/${goalId}/completed`);
    return response.data; // Returns updated goal data
};

// Recommendation Endpoints
export const getRecommendations = async () => {
    const response = await api.get('/recommendations');
    return response.data; // Returns list of recommended problems
};

export default api; // Export the Axios instance for further use
