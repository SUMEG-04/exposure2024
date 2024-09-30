// src/pages/Home.jsx

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // Import CSS styles for the home page

const Home = () => {
    const { user } = useContext(AuthContext); // Get user data from AuthContext

    return (
        <div className="home-container">
            <h1>Welcome to DSA Tracker</h1>
            <p>Your one-stop solution for tracking your Data Structures and Algorithms journey!</p>
            <div className="features">
                <h2>Features</h2>
                <ul>
                    <p>Track your solved problems from multiple coding platforms.</p>
                    <p>Set personalized goals to enhance your problem-solving skills.</p>
                    <p>Get personalized recommendations based on your performance.</p>
                    <p>Visualize your progress and performance over time.</p>
                </ul>
            </div>
            <div className="cta-buttons">
                {user ? (
                    <>
                        <Link to="/dashboard" className="cta-button">Go to Dashboard</Link>
                        <Link to="/goals" className="cta-button">Manage Goals</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="cta-button">Login</Link>
                        <Link to="/signup" className="cta-button">Sign Up</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
