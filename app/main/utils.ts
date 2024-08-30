import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { Category, Expense } from "@prisma/client";

export async function getCategoricalExpenses() {
  const session = await getServerSession(authOptions);

  return await prisma.expense.findMany({
    where: {
      userId: session?.user.id,
      category: { not: null },
    },
  });
}

export async function getExpenses({
  pageSize,
  page,
  category,
  sorting,
}: {
  pageSize?: number;
  page?: number;
  category?: Category | null;
  sorting?: { by: keyof Expense | undefined; direction: "asc" | "desc" };
}) {
  const session = await getServerSession(authOptions);

  const where = category
    ? {
        category,
      }
    : undefined;

  const orderBy = sorting
    ? {
        [sorting.by ? sorting.by : "date"]: sorting.direction,
      }
    : undefined;

  const take = pageSize ? pageSize : undefined;
  const skip = page && pageSize ? (page - 1) * pageSize : undefined;

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      expenses: {
        where,
        orderBy: orderBy,
        skip,
        take,
      },
    },
  });

  return user?.expenses!;
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
        type,
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
