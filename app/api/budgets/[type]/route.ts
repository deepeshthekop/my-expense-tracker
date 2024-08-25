import { BudgetPatchSchema } from "@/app/validations";
import prisma from "@/prisma/client";
import { Category } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { type: Category } }
) {
  const body = await request.json();

  const budget = await prisma.budget.findUnique({
    where: {
      userId_type: {
        userId: body.userId,
        type: params.type,
      },
    },
  });

  if (!budget) return NextResponse.json({}, { status: 404 });

  const deletedBudget = await prisma.budget.delete({
    where: {
      userId_type: {
        userId: body.userId,
        type: params.type,
      },
    },
  });

  return NextResponse.json(deletedBudget);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { type: Category } }
) {
  const body: z.infer<typeof BudgetPatchSchema> = await request.json();

  const validate = BudgetPatchSchema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(validate.error, { status: 400 });

  const budget = await prisma.budget.findUnique({
    where: {
      userId_type: {
        userId: body.userId,
        type: params.type,
      },
    },
  });

  if (!budget) return NextResponse.json({}, { status: 404 });

  const updatedBudget = await prisma.budget.update({
    where: {
      userId_type: {
        userId: body.userId,
        type: params.type,
      },
    },
    data: {
      capacity: body.capacity,
    },
  });

  return NextResponse.json(updatedBudget);
}
