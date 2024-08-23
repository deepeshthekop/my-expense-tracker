import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { BudgetSchema } from "../route";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const budget = await prisma.budget.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!budget) return NextResponse.json({}, { status: 404 });

  const deletedBudget = await prisma.budget.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  return NextResponse.json(deletedBudget);
}

export const BudgetPatchSchema = z.object({
  capacity: z.coerce.number().min(0.1, "Amount is required"),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const budget = await prisma.budget.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!budget) return NextResponse.json({}, { status: 404 });

  const body: z.infer<typeof BudgetPatchSchema> = await request.json();

  const validate = BudgetPatchSchema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(validate.error, { status: 400 });

  const updatedBudget = await prisma.budget.update({
    where: {
      id: budget.id,
    },
    data: {
      capacity: body.capacity,
    },
  });

  return NextResponse.json(updatedBudget);
}
