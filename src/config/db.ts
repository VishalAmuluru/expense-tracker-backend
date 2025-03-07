// src/config/db.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Expense } from "../entities/Expense";
import { Budget } from "../entities/Budget";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql", // Using MySQL instead of PostgreSQL
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME || "your_username",
  password: process.env.DB_PASSWORD || "your_password",
  database: process.env.DB_DATABASE || "your_database",
  synchronize: true, // For development only; use migrations in production
  logging: false,
  entities: [User, Expense, Budget],
});
