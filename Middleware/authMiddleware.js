const jwt = require('jsonwebtoken');
const secretKey = 'jwt-secret-key';
     const authenticate = (req, res, next) => {
    const accessToken = req.cookies['access_token'];
    const refreshToken = req.cookies['refresh_token'];
    if (!accessToken && !refreshToken) {
        return res.status(401).send('Access Denied. No token provided.');
    }
    try {
        const decoded = jwt.verify(accessToken, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
module.exports = { authenticate }
