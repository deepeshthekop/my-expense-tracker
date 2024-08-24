import { Expense } from "@prisma/client";
import { Box, Card, Flex, ScrollArea, Text } from "@radix-ui/themes";
import ExpenseBadge from "@/app/(components)/ExpenseBadge";

function RecentExpensesCard({ expenses }: { expenses: Expense[] }) {
  return (
    <Card className="p-5 space-y-4 h-[350px]">
      <Text as="p" className="text-2xl" weight="bold">
        Recent Expenses
      </Text>
      <ScrollArea
        className="min-h-fit max-h-60"
        scrollbars="vertical"
        type="auto"
      >
        <Box className="mr-4 space-y-3">
          {expenses.map((expense) => (
            <Card key={expense.id}>
              <Flex justify="between" align="end">
                <Box>
                  <Text as="div">{expense.title}</Text>
                  <Text size="2">
                    {expense.date.toLocaleDateString("en-GB")}
                  </Text>
                </Box>
                <Flex justify="between" direction="column" gapY="2">
                  <Text align="right" weight="bold">
                    $ {expense.amount}
                  </Text>
                  {expense.category && (
                    <ExpenseBadge category={expense.category} />
                  )}
                </Flex>
              </Flex>
            </Card>
          ))}
        </Box>
      </ScrollArea>
    </Card>
  );
}

export default RecentExpensesCard;
