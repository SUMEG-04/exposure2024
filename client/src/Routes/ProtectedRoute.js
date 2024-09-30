// src/components/ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
    const { user } = useContext(AuthContext); // Get user data from AuthContext

    if (!user) {
        // If user is not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }

    return element; // If authenticated, return the requested element
};

export default ProtectedRoute;
