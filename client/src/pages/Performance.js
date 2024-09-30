// src/pages/Performance.js

import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchUserProblems } from '../services/problemService';
import '../styles/Performance.css'; // Import CSS styles for the performance page

const Performance = () => {
    const { user } = useContext(AuthContext);
    const [problems, setProblems] = useState([]);
    const [totalSolved, setTotalSolved] = useState(0);
    const [performanceData, setPerformanceData] = useState([]);

    useEffect(() => {
        const loadProblems = async () => {
            const fetchedProblems = await fetchUserProblems();
            setProblems(fetchedProblems);
            setTotalSolved(fetchedProblems.length); // Count total problems solved

            // Optional: Create performance data based on problems (e.g., grouped by month)
            const performance = calculatePerformance(fetchedProblems);
            setPerformanceData(performance);
        };

        loadProblems();
    }, []);

    const calculatePerformance = (problems) => {
        const performanceMap = {};
        
        problems.forEach((problem) => {
            const month = new Date(problem.completionDate).toLocaleString('default', { month: 'long', year: 'numeric' });
            performanceMap[month] = (performanceMap[month] || 0) + 1;
        });

        return Object.entries(performanceMap).map(([month, count]) => ({ month, count }));
    };

    return (
        <div className="performance-container">
            <h2>Your Performance</h2>
            <p>Total Problems Solved: {totalSolved}</p>
            <h3>Performance Over Time</h3>
            <ul>
                {performanceData.map((data) => (
                    <li key={data.month}>
                        {data.month}: {data.count} problems solved
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Performance;
