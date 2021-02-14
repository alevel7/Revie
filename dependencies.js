// middlewares
const jwt = require('jsonwebtoken');
// import 'dotenv/config';
const verifyToken = async (req, res, next) => {
    if (!req.headers.token) {
        return res.status(401).json({ "success": false, "error": "Unauthorized user" })
    }
    const token = req.headers.token
    if (token === 'null') {
        return res.status(401).json({ "status": "token error", "error": "Token is required" })
    }
    jwt.verify(token, process.env.MY_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ "status": "token error", "error": "Unauthorized request" })
        }
        req.userId = decoded.id
    })
    next()
}

module.exports = {verifyToken}