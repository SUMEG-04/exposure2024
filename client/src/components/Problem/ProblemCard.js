// src/components/ProblemCard.jsx

import React from 'react';
import '../../styles/ProblemCard.css'; // Import CSS styles for the ProblemCard

const ProblemCard = ({ problem }) => {
    return (
        <div className="problem-card">
            <h3 className="problem-title">{problem.title}</h3>
            <p className="problem-details">Difficulty: {problem.difficulty}</p>
            <p className="problem-details">Platform: {problem.platform}</p>
            <p className="problem-completion-date">
                Completion Date: {new Date(problem.completionDate).toLocaleDateString()}
            </p>
        </div>
    );
};

export default ProblemCard;
