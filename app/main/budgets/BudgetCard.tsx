import { Budget, Expense } from "@prisma/client";
import { Box, Card, Flex, Progress, Text } from "@radix-ui/themes";
import Link from "next/link";
import { ExpenseIcon } from "@/app/(components)/ExpenseBadge";

interface Props {
  categoricalExpense: {
    category: Budget;
    expenses: Expense[];
  };
}

function BudgetCard(categoricalExpense: Props) {
  const { category, expenses } = categoricalExpense.categoricalExpense;

  const [totalExpense, count] = expenses.reduce(
    (a, expense, index) => [a[0] + expense.amount, index + 1],
    [0, 0]
  );

  const isOverBudget = totalExpense > category.capacity;

  return (
    <Link href={`/main/budgets/${category.type}`}>
      <Card className="space-y-5 cursor-pointer transition-colors hover:bg-[var(--gray-4)]">
        <Flex align="center" justify="between">
          <Flex align="center" gap="2">
            <ExpenseIcon category={category.type} />
            <Box className="flex flex-col">
              <Text weight="bold" className="text-md">
                {category.type.charAt(0).toUpperCase() +
                  category.type.slice(1).toLowerCase()}
              </Text>
              <Text className="text-sm text-[var(--gray-12)]">
                {count} {count == 1 ? "Item" : "Items"}
              </Text>
            </Box>
          </Flex>
          <Text weight="bold" className="text-xl text-[var(--accent-11)]">
            $ {category.capacity}
          </Text>
        </Flex>
        <Flex direction="column" gap="2">
          <Flex justify="between">
            <Text className="text-sm text-[var(--gray-11)]">
              $ {totalExpense} Spend
            </Text>
            <Text
              className={`text-sm ${
                isOverBudget ? "text-red-500" : "text-[var(--gray-11)]"
              }`}
            >
              $ {category.capacity - totalExpense} Remaining
            </Text>
          </Flex>
          <Progress
            value={
              isOverBudget ? 100 : (totalExpense / category.capacity) * 100
            }
          />
        </Flex>
      </Card>
    </Link>
  );
}

export default BudgetCard;
