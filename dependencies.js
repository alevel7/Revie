import multer from 'multer';

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

//to store images in a folder in node js
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'video/mpeg' || file.mimetype == 'video/3gpp' || file.mimetype == 'video/x-msvideo') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = {verifyToken, upload}