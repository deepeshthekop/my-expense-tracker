import { Card, Flex, Box, Progress, Text } from "@radix-ui/themes";
import { ExpenseIcon } from "../expenses/ExpenseBadge";
import { Category } from "@prisma/client";

function BudgetCard({
  category,
  total,
  spend,
}: {
  category: Category;
  total: number;
  spend: number;
}) {
  return (
    <Card className="space-y-5">
      <Flex align="center" justify="between">
        <Flex align="center" gap="2">
          <ExpenseIcon category={category} />
          <Box>
            <Text weight="medium" className="text-lg">
              {category.charAt(0).toUpperCase() +
                category.slice(1).toLowerCase()}
            </Text>
          </Box>
        </Flex>
        <Text weight="bold" className="text-xl text-[var(--accent-11)]">
          $ {total}
        </Text>
      </Flex>
      <Flex direction="column" gap="2">
        <Flex justify="between">
          <Text className="text-sm text-[var(--gray-11)]">$ {spend} Spend</Text>
          <Text className="text-sm text-[var(--gray-11)]">
            $ {total - spend} Remaining
          </Text>
        </Flex>
        <Progress value={25} />
      </Flex>
    </Card>
  );
}

export default BudgetCard;
