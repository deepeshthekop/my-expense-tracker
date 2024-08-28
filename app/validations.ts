import { Category } from "@prisma/client";
import { z } from "zod";

export const ExpenseSchema = z.object({
  userId: z.string().min(1, "user id is required"),
  amount: z.coerce.number().min(0.1, "Amount is required"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(128, "Title cannot be more than 128 characters."),
  category: z.nativeEnum(Category).optional(),
});

export const BudgetSchema = z.object({
  userId: z.string().min(1, "user id is required"),
  capacity: z.coerce.number().min(0.1, "Amount is required"),
  type: z.nativeEnum(Category),
});

export const BudgetPatchSchema = z.object({
  userId: z.string().min(1, "user id is required"),
  capacity: z.coerce.number().min(0.1, "Amount is required"),
});

export const RegistrationSchema = z.object({
  name: z.string().min(1, "Please enter your name."),
  email: z
    .string()
    .min(1, "Please enter your email.")
    .email("Email is not valid."),
  password: z.string().min(1, "Please enter your password."),
});

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email.")
    .email("Email is not valid."),
  password: z.string().min(1, "Please enter your password."),
});
