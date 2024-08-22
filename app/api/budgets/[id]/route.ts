import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
