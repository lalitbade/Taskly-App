const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Use environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Check if the user exists
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Attach user to the request
        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            // Specific error for JWT verification issues
            return res.status(401).json({ message: 'Invalid token' });
        }
        // General error handling
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authMiddleware;
