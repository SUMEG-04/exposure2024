// src/pages/Dashboard.jsx

import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchUserProblems } from '../services/problemService';
import { fetchGoals } from '../services/goalService';
import { fetchRecommendations } from '../services/recommendationService';
import '../styles/Dashboard.css'; // Import CSS styles for the dashboard

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [problems, setProblems] = useState([]);
    const [goals, setGoals] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const fetchedProblems = await fetchUserProblems();
            const fetchedGoals = await fetchGoals();
            const fetchedRecommendations = await fetchRecommendations();

            setProblems(fetchedProblems);
            setGoals(fetchedGoals);
            setRecommendations(fetchedRecommendations);
            setLoading(false);
        };

        loadData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <div className="dashboard-container">
            <h2>Welcome, {user.name}!</h2>
            <div className="dashboard-section">
                <h3>Your Goals</h3>
                {goals.length === 0 ? (
                    <p>No goals set. Start by creating a new goal!</p>
                ) : (
                    <ul className="goal-list">
                        {goals.map((goal) => (
                            <li key={goal._id} className="goal-item">
                                <p>Target: {goal.targetProblems} Problems | Difficulty: {goal.difficultyLevel}</p>
                                <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="dashboard-section">
                <h3>Your Solved Problems</h3>
                {problems.length === 0 ? (
                    <p>No problems solved yet. Start solving to track your progress!</p>
                ) : (
                    <ul className="problem-list">
                        {problems.map((problem) => (
                            <li key={problem._id} className="problem-item">
                                <h4>{problem.title}</h4>
                                <p>Difficulty: {problem.difficulty}</p>
                                <p>Platform: {problem.platform}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="dashboard-section">
                <h3>Recommended Problems</h3>
                {recommendations.length === 0 ? (
                    <p>No recommendations available at this time.</p>
                ) : (
                    <ul className="recommendation-list">
                        {recommendations.map((problem, index) => (
                            <li key={index} className="recommendation-item">
                                <h4>{problem.title}</h4>
                                <p>Difficulty: {problem.difficulty}</p>
                                <p>Platform: {problem.platform}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
