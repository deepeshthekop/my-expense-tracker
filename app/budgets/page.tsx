import { Box, Flex, Grid, Heading, IconButton, Text } from "@radix-ui/themes";
import { FaPlus } from "react-icons/fa";
import BudgetCard from "./BudgetCard";
import prisma from "@/prisma/client";
import { Budget, Category, Expense } from "@prisma/client";

async function budgetsPage() {
  let budgets: Budget[] = [];

  for (let type in Category) {
    const budget = await prisma.budget.findUnique({
      where: {
        type: type as Category,
      },
    });

    if (budget) budgets = [...budgets, budget];
  }

  let categoricalExpenses: { category: Budget; expenses: Expense[] }[] = [];

  for (let i = 0; i < budgets.length; i++) {
    const expenses = await prisma.expense.findMany({
      where: {
        category: budgets[i].type,
      },
    });

    categoricalExpenses = [
      ...categoricalExpenses,
      {
        category: budgets[i],
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
        <Box gridColumn="span 1">
          <IconButton
            variant="soft"
            className="border-2 border-dashed w-full h-[150px]"
          >
            <Flex direction="column" align="center" gap="2">
              <FaPlus size={32} />
              <Text>Add New Budget</Text>
            </Flex>
          </IconButton>
        </Box>
        {categoricalExpenses.map((categoricalExpense) => (
          <BudgetCard categoricalExpense={categoricalExpense} />
        ))}
      </Grid>
    </Box>
  );
}

export default budgetsPage;
