import prisma from "@/prisma/client";

export async function getCategoricalExpenses(userId: string) {
  return await prisma.expense.findMany({
    where: {
      userId: userId,
      category: { not: null },
    },
  });
}

export async function getExpenses(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      expenses: true,
    },
  });

  return user?.expenses;
}

export async function getBudgets(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      budgets: true,
    },
  });

  return user?.budgets;
}

export async function getUser(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
