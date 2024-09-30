// src/components/GoalCard.jsx

import React from 'react';
import '../../styles/GoalCard.css'; // Import CSS styles for the GoalCard

const GoalCard = ({ goal, onUpdateProgress, onComplete }) => {
    const handleUpdate = () => {
        onUpdateProgress(goal._id); // Call the update function with the goal ID
    };

    const handleComplete = () => {
        onComplete(goal._id); // Call the complete function with the goal ID
    };

    return (
        <div className="goal-card">
            <h3 className="goal-title">Target: {goal.targetProblems} Problems</h3>
            <p className="goal-details">Difficulty Level: {goal.difficultyLevel}</p>
            <p className="goal-details">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
            <p className="goal-progress">Progress: {goal.progress}/{goal.targetProblems}</p>
            <div className="goal-actions">
                <button onClick={handleUpdate} className="goal-button">Update Progress</button>
                <button onClick={handleComplete} className="goal-button complete">Complete Goal</button>
            </div>
        </div>
    );
};

export default GoalCard;
