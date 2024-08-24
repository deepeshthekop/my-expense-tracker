import { ExpenseSchema } from "@/app/validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

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
