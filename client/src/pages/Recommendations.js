// src/pages/Recommendation.js

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchRecommendations } from '../services/recommendationService';
import '../styles/Recommendation.css'; // Import CSS styles for the recommendations page
import RecommendationCard from '../components/Recommendation/RecommendationCard';

const Recommendation = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadRecommendations = async () => {
            const fetchedRecommendations = await fetchRecommendations();
            setRecommendations(fetchedRecommendations);
            setLoading(false);
        };

        loadRecommendations();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <div className="recommendation-container">
            <h2>Recommended Problems for You</h2>
            {recommendations.length === 0 ? (
                <p>No recommendations available at this time.</p>
            ) : (
                <ul className="recommendation-list">
                    {recommendations.map((problem, index) => (
                        <RecommendationCard key={index} recommendation={problem} />
                    ))}
                </ul>

            )}
        </div>
    );
};

export default Recommendation;
