require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        res.status(411).json({
            message: "Invalid token"
        })
    }
    else {
        try {
            let token = req.headers.authorization.split(" ")[1];
            let jwtData = jwt.verify(token, process.env.JWT_SECRET);
            if (jwtData.userId) {
                req.userId = jwtData.userId;
                next();
            }
        }
        catch {
            res.status(403).json({ "message": "Invalid login token" });
        }
    }
}
module.exports = {
    authMiddleware
}