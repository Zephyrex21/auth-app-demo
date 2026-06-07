import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ─── REGISTER ────────────────────────────────────────────────────────────────
// POST /api/users/register
// Body: { name, email, password }

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 0. Validate inputs before touching the DB
        if (!name || !name.trim())     return res.status(400).json({ message: "Name is required" });
        if (!email || !email.trim())   return res.status(400).json({ message: "Email is required" });
        if (!password)                 return res.status(400).json({ message: "Password is required" });
        if (password.length < 5)       return res.status(400).json({ message: "Password must be at least 5 characters" });
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))   return res.status(400).json({ message: "Invalid email address" });

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Hash the password  (never store plain text!)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Save user to database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email },
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// ─── LOGIN ───────────────────────────────────────────────────────────────────
// POST /api/users/login
// Body: { email, password }

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 0. Validate inputs
        if (!email || !email.trim())   return res.status(400).json({ message: "Email is required" });
        if (!password)                 return res.status(400).json({ message: "Password is required" });

        // 1. Find user by email
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 2. Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 3. Generate a JWT token (expires in 1 day)
        const token = jwt.sign(
            { id: user._id, email: user.email },   // payload
            process.env.JWT_SECRET,                 // secret key
            { expiresIn: "1d" }                     // expiry
        );

        res.status(200).json({
            message: "Login successful",
            token,  // send token to client → client stores it and sends with future requests
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// ─── GET PROFILE (Protected) ─────────────────────────────────────────────────
// GET /api/users/profile
// Header: Authorization: Bearer <token>

export const getProfile = async (req, res) => {
    try {
        // req.user is set by the authMiddleware after token verification
        const user = await User.findById(req.user.id).select("-password");  // exclude password

        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
