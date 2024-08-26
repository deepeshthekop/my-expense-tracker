import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { Category } from "@prisma/client";

export async function getCategoricalExpenses() {
  const session = await getServerSession(authOptions);

  return await prisma.expense.findMany({
    where: {
      userId: session?.user.id,
      category: { not: null },
    },
  });
}

export async function getExpenses() {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      expenses: {
        orderBy: {
          date: "desc",
        },
      },
    },
  });

  return user?.expenses;
}

export async function getUniqueExpenses(type: Category | null) {
  const session = await getServerSession(authOptions);

  return await prisma.expense.findMany({
    where: {
      userId: session?.user.id,
      category: type,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function getSingleExpense(expenseId: string) {
  const session = await getServerSession(authOptions);

  return await prisma.expense.findUnique({
    where: {
      id: expenseId,
      userId: session?.user.id,
    },
  });
}

export async function getBudgets() {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      budgets: true,
    },
  });

  return user?.budgets;
}

export async function getUniqueBudget(type: Category) {
  const session = await getServerSession(authOptions);

  return await prisma.budget.findUnique({
    where: {
      userId_type: {
        userId: session?.user.id!,
        type: type,
      },
    },
  });
}

export async function getUser() {
  const session = await getServerSession(authOptions);

  return await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
}
