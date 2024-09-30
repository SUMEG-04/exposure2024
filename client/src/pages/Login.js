// src/pages/Login.js

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css'; // Import CSS styles for authentication pages
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext); // Get login function from AuthContext
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error
    
        try {
            const res = await login({ email, password }); // Ensure this correctly calls the login function
            console.log(res); // Log the response for debugging
            // Save the token in local storage
            localStorage.setItem('token', res.token);
            history('/dashboard'); // Redirect to the dashboard
        } catch (err) {
            setError('Login failed. Invalid credentials.'); // Update error message
            console.error('Login error:', err); // Log detailed error
        }
    };
    

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>} {/* Display error message if any */}
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="auth-button">Login</button>
            </form>
            <p className="auth-footer">
                Don't have an account? <a href="/signup">Sign up here</a>
            </p>
        </div>
    );
};

export default Login;
