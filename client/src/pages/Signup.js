// src/pages/Signup.js

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css'; // Import CSS styles for authentication pages
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const { register } = useContext(AuthContext); // Get register function from AuthContext
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error

        try {
            const res=await register({ name, email, password });
            history.push('/dashboard');
        } catch (err) {
            setError('Registration failed. Please try again.'); // Handle registration error
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            {error && <div className="error-message">{error}</div>} {/* Display error message if any */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="auth-button">Sign Up</button>
            </form>
            <p className="auth-footer">
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
};

export default Signup;
