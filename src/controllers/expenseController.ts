import { Request, Response, RequestHandler } from "express";
import { AppDataSource } from "../config/db";
import { Expense } from "../entities/Expense";
import { User } from "../entities/User";

// Get all expenses for the authenticated user
export const getExpenses: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const expenseRepo = AppDataSource.getRepository(Expense);
    const expenses = await expenseRepo.find({ where: { user: { id: userId } } });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch expenses", error });
  }
};

// Add a new expense
export const addExpense: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const expenseRepo = AppDataSource.getRepository(Expense);
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    const expense = expenseRepo.create({ ...req.body, user });
    await expenseRepo.save(expense);
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Could not add expense", error });
  }
};

// Update an existing expense
export const updateExpense: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const expenseId = req.params.id;
    const expenseRepo = AppDataSource.getRepository(Expense);
    const expense = await expenseRepo.findOneBy({ id: parseInt(expenseId) });
    if (!expense) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    // Create a new object with the updated values
    const updatedExpense = { ...expense, ...req.body };
    const savedExpense = await expenseRepo.save(updatedExpense);
    res.json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: "Could not update expense", error });
  }
};

// Delete an expense
export const deleteExpense: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const expenseId = req.params.id;
    const expenseRepo = AppDataSource.getRepository(Expense);
    const result = await expenseRepo.delete(expenseId);
    if (result.affected === 0) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete expense", error });
  }
};
