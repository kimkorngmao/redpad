const jwt = require('jsonwebtoken')

const IsAuth = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if(!token){
        return res.status(201).json({ "message": "Access denied. Please login to take action."})
    }
    try {
        const isValidToken = jwt.verify(token, "JWT_SECRET")
        req.user = isValidToken;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
}

module.exports = { IsAuth }