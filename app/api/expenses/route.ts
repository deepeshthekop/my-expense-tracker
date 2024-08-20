import prisma from "@/prisma/client";
import { Category } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const ExpenseSchema = z.object({
  amount: z.coerce.number().min(0.1, "Amount is required"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(128, "Title cannot be more than 128 characters."),
  category: z.nativeEnum(Category).optional(),
});

export async function POST(request: NextRequest) {
  const body: z.infer<typeof ExpenseSchema> = await request.json();

  const validate = ExpenseSchema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(validate.error, { status: 400 });

  const newExpense = await prisma.expense.create({
    data: {
      title: body.title,
      amount: body.amount,
      category: body.category,
    },
  });

  return NextResponse.json(newExpense);
}
