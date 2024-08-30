import { colorMap } from "@/app/(components)/ExpenseBadge";
import ExpensesTable from "@/app/(components)/ExpensesTable";
import UseageBar from "@/app/(components)/UsageBar";
import { authOptions } from "@/app/auth";
import { getExpenses, getUniqueBudget } from "@/app/main/utils";
import { Category, Expense } from "@prisma/client";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import DeleteBudgetButton from "./DeleteBudgetDialog";
import EditBudgetButton from "./EditBudgetDialog";

const validSort = ["amount", "title", "date"];

async function SingleBudgetPage({
  params,
  searchParams,
}: {
  params: { type: Category };
  searchParams: {
    sort?: keyof Expense;
    direction?: "asc" | "desc";
  };
}) {
  const session = await getServerSession(authOptions);

  const by =
    searchParams.sort && validSort.includes(searchParams.sort)
      ? searchParams.sort
      : undefined;
  const direction =
    searchParams.direction && ["asc", "desc"].includes(searchParams.direction)
      ? searchParams.direction
      : "desc";

  const budget = await getUniqueBudget(params.type);

  if (!budget) return notFound();

  const expenses = await getExpenses({
    category: budget.type,
    sorting: { by, direction },
  });

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
          <UseageBar spend={totalCategoryExpense} total={budget.capacity} />
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
