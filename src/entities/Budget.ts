import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  category!: string;

  @Column("decimal")
  limit!: number;

  @Column()
  month!: string; // format "YYYY-MM"

  @ManyToOne(() => User, (user) => user.budgets)
  user!: User;
}
