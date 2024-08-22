import { colorMap } from "@/app/expenses/ExpenseBadge";
import prisma from "@/prisma/client";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import DeleteBudgetButton from "./DeleteBudgetDialog";

async function SingleBudgetPage({ params }: { params: { id: string } }) {
  const budget = await prisma.budget.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!budget) return null;

  return (
    <Box className="m-10">
      <Flex align="center" justify="between" className="mt-10">
        <Heading className="text-xl md:text-3xl lg:text-5xl">
          {colorMap[budget.type].emoji} {colorMap[budget.type].label} Budget
        </Heading>
        <DeleteBudgetButton budget={budget} />
      </Flex>
      <Box className="mt-10">
        <Text className="text-2xl">Budget Allocated: $ {budget.capacity}</Text>
      </Box>
    </Box>
  );
}

export const dynamic = "force-dynamic";

export default SingleBudgetPage;
