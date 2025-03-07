import { Request, Response, RequestHandler } from "express";
import { AppDataSource } from "../config/db";
import { Budget } from "../entities/Budget";
import { User } from "../entities/User";

// Get all budgets for the authenticated user
export const getBudgets: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const budgetRepo = AppDataSource.getRepository(Budget);
    const budgets = await budgetRepo.find({ where: { user: { id: userId } } });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch budgets", error });
  }
};

// Add a new budget
export const addBudget: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const budgetRepo = AppDataSource.getRepository(Budget);
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    const budget = budgetRepo.create({ ...req.body, user });
    await budgetRepo.save(budget);
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: "Could not add budget", error });
  }
};

// Update an existing budget
export const updateBudget: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const budgetId = req.params.id;
    const budgetRepo = AppDataSource.getRepository(Budget);
    const budget = await budgetRepo.findOneBy({ id: parseInt(budgetId) });
    if (!budget) {
      res.status(404).json({ message: "Budget not found" });
      return;
    }
    // Create a new object that merges the existing budget with the updates
    const updatedBudget = { ...budget, ...req.body };
    const savedBudget = await budgetRepo.save(updatedBudget);
    res.json(savedBudget);
  } catch (error) {
    res.status(500).json({ message: "Could not update budget", error });
  }
};

// Delete a budget
export const deleteBudget: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const budgetId = req.params.id;
    const budgetRepo = AppDataSource.getRepository(Budget);
    const result = await budgetRepo.delete(budgetId);
    if (result.affected === 0) {
      res.status(404).json({ message: "Budget not found" });
      return;
    }
    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete budget", error });
  }
};
