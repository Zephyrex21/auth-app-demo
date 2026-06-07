import express from "express";
import { register, login, getProfile } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes (no token needed)
router.post("/register", register);
router.post("/login", login);

// Protected route (token required)
router.get("/profile", protect, getProfile);

export default router;
