import jwt from "jsonwebtoken";


// This middleware runs BEFORE the controller on protected routes
// It checks: does the request carry a valid JWT token?

const protect = (req, res, next) => {

    // 1. Get token from request header
    //    Client must send:  Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided. Access denied." });
    }

    const token = authHeader.split(" ")[1];  // extract token after "Bearer "

    // 2. Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // { id, email } — attach to request for controller to use
        next();              // token is valid → go to the next handler

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

export default protect;
