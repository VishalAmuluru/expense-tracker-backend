import { Request, Response, RequestHandler } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import dotenv from "dotenv";

dotenv.config();

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const userRepo = AppDataSource.getRepository(User);

    const existingUser = await userRepo.findOneBy({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepo.create({ email, password: hashedPassword });
    await userRepo.save(user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const payload = { id: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

export const refreshToken: RequestHandler = (req: Request, res: Response): void => {
  const { token } = req.body;
  if (!token) {
    res.status(400).json({ message: "Refresh token missing" });
    return;
  }

  jwt.verify(token, process.env.REFRESH_SECRET as string, (err: any, decoded: any) => {
    if (err) {
      res.status(403).json({ message: "Invalid refresh token" });
      return;
    }
    const payload = { id: decoded.id, email: decoded.email };
    const accessToken = generateAccessToken(payload);
    res.json({ accessToken });
  });
};
