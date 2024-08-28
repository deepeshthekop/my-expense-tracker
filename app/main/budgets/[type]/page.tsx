import { colorMap } from "@/app/(components)/ExpenseBadge";
import ExpensesTable from "@/app/(components)/ExpensesTable";
import { getUniqueBudget, getUniqueExpenses } from "@/app/main/utils";
import { Category } from "@prisma/client";
import { Box, Flex, Heading, Progress, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteBudgetButton from "./DeleteBudgetDialog";
import EditBudgetButton from "./EditBudgetDialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";

async function SingleBudgetPage({ params }: { params: { type: Category } }) {
  const session = await getServerSession(authOptions);

  const budget = await getUniqueBudget(params.type);

  if (!budget) return notFound();

  const expenses = await getUniqueExpenses(budget.type);

  const totalCategoryExpense = expenses.reduce(
    (a, expense) => a + expense.amount,
    0
  );

  const isOverBudget = totalCategoryExpense > budget.capacity;

  return (
    <Box className="m-5 md:m-10">
      <Flex
        align={{
          initial: "start",
          sm: "center",
        }}
        direction={{
          initial: "column",
          sm: "row",
        }}
        gap="3"
        justify="between"
        className="mt-10"
      >
        <Heading className="text-2xl md:text-3xl lg:text-5xl">
          {colorMap[budget.type].emoji} {colorMap[budget.type].label} Budget
        </Heading>
        <Flex gap="3">
          <EditBudgetButton userId={session?.user.id!} budget={budget} />
          <DeleteBudgetButton userId={session?.user.id!} budget={budget} />
        </Flex>
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
          <ExpensesTable userId={session?.user.id!} expenses={expenses} />
        </Box>
      </Box>
    </Box>
  );
}

export default SingleBudgetPage;
