import prisma from "@/prisma/client";

export async function getCategoricalExpenses() {
  return await prisma.expense.findMany({
    where: {
      category: { not: null },
    },
  });
}

export async function getExpenses() {
  return await prisma.expense.findMany({
    orderBy: {
      date: "desc",
    },
  });
}

export async function getBudgets() {
  return await prisma.budget.findMany();
}

export async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}
