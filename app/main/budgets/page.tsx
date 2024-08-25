import prisma from "@/prisma/client";
import { Budget, Category, Expense } from "@prisma/client";
import { Box, Grid, Heading } from "@radix-ui/themes";
import BudgetCard from "./BudgetCard";
import NewBudgetDialog from "./NewBudgetDialog";
import { authOptions } from "@/app/auth";
import { getServerSession } from "next-auth";
import { getBudgets } from "@/app/utils";

async function budgetsPage() {
  const session = await getServerSession(authOptions);

  const budgets = await getBudgets(session?.user.id!);

  let categoricalExpenses: { category: Budget; expenses: Expense[] }[] = [];

  budgets?.map(async (budget) => {
    const expenses = await prisma.expense.findMany({
      where: {
        userId: session?.user.id!,
        category: budget.type,
      },
    });
  });

  for (let i = 0; i < budgets!.length; i++) {
    const expenses = await prisma.expense.findMany({
      where: {
        userId: session?.user.id!,
        category: budgets![i].type,
      },
    });

    categoricalExpenses = [
      ...categoricalExpenses,
      {
        category: budgets![i],
        expenses: expenses,
      },
    ];
  }

  return (
    <Box className="m-10">
      <Heading size="8" className="mt-10">
        Budgets
      </Heading>
      <Grid
        columns={{ initial: "1", sm: "2", lg: "3" }}
        gap="5"
        className="mt-5"
      >
        <NewBudgetDialog budgetsInUse={budgets!} />
        {categoricalExpenses.map((categoricalExpense) => (
          <BudgetCard
            key={categoricalExpense.category.type}
            categoricalExpense={categoricalExpense}
          />
        ))}
      </Grid>
    </Box>
  );
}

export const dynamic = "force-dynamic";

export default budgetsPage;
