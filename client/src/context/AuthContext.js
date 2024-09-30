// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { fetchUserProfile, loginUserService, registerNewUser, updateProfileService } from '../services/userService';
import { fetchRecommendations } from '../services/recommendationService';

// Create a Context
export const AuthContext = createContext();

// Create a Provider component
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState([]);

    // Fetch user profile data
    const loadUserProfile = async () => {
        try {
            const profileData = await fetchUserProfile();
            setUser(profileData);
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    };

    // Fetch recommendations
    const loadRecommendations = async () => {
        try {
            const recs = await fetchRecommendations();
            setRecommendations(recs);
        } catch (error) {
            console.error('Error loading recommendations:', error);
        }
    };

    // Login function
    const login = async (userData) => {
        try {
            const loggedInUser = await loginUserService(userData);
            setUser(loggedInUser.user); // Set user data from response
            loadRecommendations(); // Load recommendations after logging in
            return loggedInUser;
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            const registeredUser = await registerNewUser(userData);
            setUser(registeredUser);
            loadRecommendations(); // Load recommendations after registration
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const logout = () => {
        setUser(null); // Clear user data from context
        localStorage.removeItem('token'); // Remove token from localStorage
    };

    // Update user profile function
    const updateProfile = async (userData) => {
        try {
            const updatedUser = await updateProfileService(userData);
            setUser(updatedUser);
        } catch (error) {
            console.error('Update profile failed:', error);
        }
    };

    // Effect to load user profile on initial render
    useEffect(() => {
        loadUserProfile();
        setLoading(false);
    }, []);

    // Return the context provider
    return (
        <AuthContext.Provider value={{ user, loading, recommendations, logout,login, register, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
