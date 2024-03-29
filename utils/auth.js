const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(403).json({ message: 'Token is required' });
    }
    try {
        const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET);
        req.user = decoded;
        return next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid token, token is expired/not valid' });
    }
}

module.exports = {
    ensureAuthenticated,
}