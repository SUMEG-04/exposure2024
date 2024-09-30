// middlewares/authMiddleware.js

const { verifyToken } = require('../config/jwtConfig');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }

    // Attach the decoded user info to the request object
    req.user = decoded.user;
    next();
};
