import { Router } from "express";
import { getExpenses, addExpense, updateExpense, deleteExpense } from "../controllers/expenseController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.use(verifyToken);
router.get("/", getExpenses);
router.post("/", addExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
