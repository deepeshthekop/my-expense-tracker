import { authOptions } from "@/app/auth";
import { getBudgets, getExpenses } from "@/app/main/utils";
import { Budget, Expense } from "@prisma/client";
import { Box, Grid, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import BudgetCard from "./BudgetCard";
import NewBudgetDialog from "./NewBudgetDialog";
import { revalidatePath } from "next/cache";

async function budgetsPage(searchParams: { update: boolean }) {
  const session = await getServerSession(authOptions);

  const budgets = await getBudgets();

  if (searchParams.update) revalidatePath("/main/budgets");

  let categoricalExpenses: { category: Budget; expenses: Expense[] }[] = [];

  for (let i = 0; i < budgets!.length; i++) {
    const expenses = await getExpenses({ category: budgets![i].type });

    categoricalExpenses = [
      ...categoricalExpenses,
      {
        category: budgets![i],
        expenses: expenses,
      },
    ];
  }

  return (
    <Box className="m-5 md:m-10">
      <Heading size="8" className="mt-10">
        Budgets
      </Heading>
      <Grid
        columns={{ initial: "1", sm: "2", lg: "3" }}
        gap="5"
        className="mt-5"
      >
        <NewBudgetDialog userId={session?.user.id!} budgetsInUse={budgets!} />
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
