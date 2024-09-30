// src/components/RecommendationCard.jsx

import React from 'react';
import '../../styles/RecommendationCard.css'; // Import CSS styles for the RecommendationCard

const RecommendationCard = ({ recommendation }) => {
    return (
        <div className="recommendation-card">
            <h3 className="recommendation-title">{recommendation.title}</h3>
            <p className="recommendation-details">Difficulty: {recommendation.difficulty}</p>
            <p className="recommendation-details">Platform: {recommendation.platform}</p>
        </div>
    );
};

export default RecommendationCard;
