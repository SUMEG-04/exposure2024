// src/pages/ProblemList.jsx

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchUserProblems } from '../services/problemService';
import '../styles/ProblemList.css'; // Import CSS styles for the problem list page
import ProblemCard from '../components/Problem/ProblemCard';

const ProblemList = () => {
    const { user } = useContext(AuthContext);
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadProblems = async () => {
            const fetchedProblems = await fetchUserProblems();
            setProblems(fetchedProblems);
            setLoading(false);
        };

        loadProblems();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <div className="problem-list-container">
            <h2>Your Solved Problems</h2>
            {problems.length === 0 ? (
                <p>No problems solved yet. Start solving to track your progress!</p>
            ) : (
                <ul className="problem-list">
                    {problems.map((problem) => (
                        <ProblemCard key={problem._id} problem={problem} />
                    ))}
                </ul>

            )}
        </div>
    );
};

export default ProblemList;
