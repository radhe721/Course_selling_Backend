const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        console.log("Attempting to verify JWT token");
        const decoded = jwt.verify(token, process.env.JWT_SECRET_admin);
        console.log("JWT token verified. Decoded payload:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};
module.exports = authMiddleware; // Export the middleware