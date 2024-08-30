import { Expense } from "@prisma/client";
import { Box, Card, Flex, ScrollArea, Text } from "@radix-ui/themes";
import ExpenseBadge from "@/app/(components)/ExpenseBadge";

function RecentExpensesCard({ expenses }: { expenses: Expense[] }) {
  return (
    <Card className="p-5 space-y-4 h-full">
      <Text as="p" className="text-2xl" weight="bold">
        Recent Expenses
      </Text>
      {expenses.length === 0 ? (
        <Flex justify="center" align="center" className="h-[230px]">
          <Text className="text-base md:text-lg text">No recent expenses.</Text>
        </Flex>
      ) : (
        <ScrollArea className="min-h-fit" scrollbars="vertical">
          <Box className="pb-5">
            {expenses.map((expense) => (
              <Card key={expense.id} className="mb-5 mr-4">
                <Flex justify="between" align="end">
                  <Flex justify="between" direction="column" gapY="2">
                    {expense.category && (
                      <div className="sm:hidden">
                        <ExpenseBadge category={expense.category} />
                      </div>
                    )}
                    <Text as="div" className="hidden sm:block">
                      {expense.title}
                    </Text>
                    <Text size="2">
                      {expense.date.toLocaleDateString("en-GB")}
                    </Text>
                  </Flex>
                  <Flex direction="column" gapY="2">
                    <Text align="right" weight="bold">
                      $ {expense.amount}
                    </Text>
                    {expense.category && (
                      <div className="hidden sm:block">
                        <ExpenseBadge category={expense.category} />
                      </div>
                    )}
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Box>
        </ScrollArea>
      )}
    </Card>
  );
}

export default RecentExpensesCard;
