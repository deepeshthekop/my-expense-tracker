import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const expense = await prisma.expense.findUnique({
    where: {
      userId: body.userId,
      id: params.id,
    },
  });

  if (!expense) return NextResponse.json({}, { status: 404 });

  const deletedExpense = await prisma.expense.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(deletedExpense);
}
