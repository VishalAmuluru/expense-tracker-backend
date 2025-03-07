// src/routes/auth.ts
import { Router } from "express";
import { register, login, refreshToken } from "../controllers/authController";

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", register);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return JWT token
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh and return a new JWT token
 * @access  Public
 */
router.post("/refresh", refreshToken);

export default router;
