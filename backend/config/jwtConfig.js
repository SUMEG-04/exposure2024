// config/jwtConfig.js

const jwt = require('jsonwebtoken');

// Load environment variables from .env file
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';  // Set your JWT secret in .env
const jwtExpiration = process.env.JWT_EXPIRATION || '7d';       // Token expiration (default: 7 days)

// Function to generate a JWT token
const generateToken = (user) => {
    // Payload to encode in the token (can include other user details as necessary)
    const payload = {
        user: {
            id: user.id,    // Use the user's ID as part of the payload
        }
    };

    // Sign and return the token
    return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
};

// Function to verify a JWT token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret);  // Verifies and returns the decoded token
    } catch (err) {
        return null;  // Token is invalid or expired
    }
};

// Export the utility functions
module.exports = {
    generateToken,
    verifyToken
};
