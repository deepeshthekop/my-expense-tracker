import { BudgetSchema } from "@/app/validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  const body: z.infer<typeof BudgetSchema> = await request.json();

  const validate = BudgetSchema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(validate.error, { status: 400 });

  const existingBudget = await prisma.budget.findUnique({
    where: {
      type: body.type,
    },
  });

  if (existingBudget) return NextResponse.json({}, { status: 409 });

  const newBudget = await prisma.budget.create({
    data: {
      capacity: body.capacity,
      type: body.type,
    },
  });

  return NextResponse.json(newBudget);
}
