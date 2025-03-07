// src/routes/Budget.ts
import { Router } from "express";
import { getBudgets, addBudget, updateBudget, deleteBudget } from "../controllers/budgetController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

/**
 * Middleware: All routes below require a valid JWT token.
 */
router.use(verifyToken);

/**
 * @route   GET /api/budgets
 * @desc    Retrieve all budgets for the authenticated user.
 * @access  Private
 */
router.get("/", getBudgets);

/**
 * @route   POST /api/budgets
 * @desc    Create a new budget.
 * @access  Private
 */
router.post("/", addBudget);

/**
 * @route   PUT /api/budgets/:id
 * @desc    Update an existing budget by its ID.
 * @access  Private
 */
router.put("/:id", updateBudget);

/**
 * @route   DELETE /api/budgets/:id
 * @desc    Delete a budget by its ID.
 * @access  Private
 */
router.delete("/:id", deleteBudget);

export default router;
