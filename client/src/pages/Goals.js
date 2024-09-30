// src/pages/Goal.js

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createNewGoal, fetchGoals, updateProgress } from '../services/goalService';
import '../styles/Goal.css'; // Import CSS styles for the goals page
import GoalCard from '../components/Goal/GoalCard';
import { markGoalCompleted } from '../services/api';

const Goal = () => {
    const { user } = useContext(AuthContext);
    const [goals, setGoals] = useState([]);
    const [targetProblems, setTargetProblems] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('Easy');
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const loadGoals = async () => {
            const fetchedGoals = await fetchGoals();
            setGoals(fetchedGoals);
        };

        loadGoals();
    }, []);

    const handleCreateGoal = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await createNewGoal({ targetProblems, difficultyLevel, deadline });
            setTargetProblems('');
            setDifficultyLevel('Easy');
            setDeadline('');
            // Reload goals after creating a new one
            const fetchedGoals = await fetchGoals();
            setGoals(fetchedGoals);
        } catch (err) {
            setError('Failed to create goal. Please try again.');
        }
    };

    const handleUpdateProgress = async (goalId) => {
        try {
            await updateProgress(goalId);
            const fetchedGoals = await fetchGoals(); // Reload goals after updating
            setGoals(fetchedGoals);
        } catch (err) {
            console.error('Failed to update goal progress:', err);
        }
    };

    const handleCompleteGoal = async (goalId) => {
        try {
            await markGoalCompleted(goalId);
            const fetchedGoals = await fetchGoals(); // Reload goals after marking as completed
            setGoals(fetchedGoals);
        } catch (err) {
            console.error('Failed to mark goal as completed:', err);
        }
    };

    return (
        <div className="goal-container">
            <h2>Your Goals</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleCreateGoal} className="goal-form">
                <div className="form-group">
                    <label htmlFor="targetProblems">Target Problems</label>
                    <input
                        type="number"
                        id="targetProblems"
                        value={targetProblems}
                        onChange={(e) => setTargetProblems(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="difficultyLevel">Difficulty Level</label>
                    <select
                        id="difficultyLevel"
                        value={difficultyLevel}
                        onChange={(e) => setDifficultyLevel(e.target.value)}
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="deadline">Deadline</label>
                    <input
                        type="date"
                        id="deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="goal-button">Create Goal</button>
            </form>

            <div className="goal-list">
                <h3>Current Goals</h3>
                <div className="goal-list">
                    {goals.map((goal) => (
                        <GoalCard 
                            key={goal._id} 
                            goal={goal} 
                            onUpdateProgress={handleUpdateProgress} 
                            onComplete={handleCompleteGoal} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Goal;
