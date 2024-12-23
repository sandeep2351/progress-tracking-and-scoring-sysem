const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        // Decode and verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user is an admin
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: 'Admin access required' });
        }

        // Attach the decoded user info to the request object
        req.user = decoded;
        next(); // Allow the request to continue to the next middleware or route handler
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = isAdmin;
