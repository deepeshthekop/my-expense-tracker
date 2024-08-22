import { colorMap } from "@/app/expenses/ExpenseBadge";
import ExpensesTable from "@/app/expenses/ExpensesTable";
import prisma from "@/prisma/client";
import { Box, Flex, Heading, Progress, Text } from "@radix-ui/themes";
import DeleteBudgetButton from "./DeleteBudgetDialog";

async function SingleBudgetPage({ params }: { params: { id: string } }) {
  const budget = await prisma.budget.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!budget) return null;

  const expenses = await prisma.expense.findMany({
    where: {
      category: budget.type,
    },
  });

  const totalCategoryExpense = expenses.reduce(
    (a, expense) => a + expense.amount,
    0
  );

  const isOverBudget = totalCategoryExpense > budget.capacity;

  return (
    <Box className="m-10">
      <Flex align="center" justify="between" className="mt-10">
        <Heading className="text-xl md:text-3xl lg:text-5xl">
          {colorMap[budget.type].emoji} {colorMap[budget.type].label} Budget
        </Heading>
        <DeleteBudgetButton budget={budget} />
      </Flex>
      <Box className="mt-10">
        <Flex
          direction="column"
          gapY="5"
          className="text-md md:text-lg lg:text-2xl"
        >
          <Text className="text-[var(--accent-11)]" weight="bold">
            Budget Used: $ {totalCategoryExpense} / {budget.capacity}{" "}
            <Text
              className={isOverBudget ? "text-red-500" : ""}
            >{`(${Math.round(
              (totalCategoryExpense / budget.capacity) * 100
            )} %)`}</Text>
          </Text>
          <Flex direction="column">
            <Flex justify="between">
              <Text
                className={`text-sm text-end ${
                  isOverBudget ? "text-red-500" : "text-[var(--gray-11)]"
                }`}
              >
                $ {totalCategoryExpense}
              </Text>
              <Text className="text-sm text-end text-[var(--gray-11)]">
                $ {budget.capacity}
              </Text>
            </Flex>
            <Progress
              value={
                isOverBudget
                  ? 100
                  : (totalCategoryExpense / budget.capacity) * 100
              }
            />
          </Flex>
        </Flex>
        <Box className="mt-10 space-y-3">
          <Text className="text-xl">Latest Expenses</Text>
          <ExpensesTable expenses={expenses} />
        </Box>
      </Box>
    </Box>
  );
}

export default SingleBudgetPage;
