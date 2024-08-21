import { Box, Flex, Grid, Heading, IconButton, Text } from "@radix-ui/themes";
import { FaPlus } from "react-icons/fa";
import BudgetCard from "./BudgetCard";

function budgetsPage() {
  return (
    <Box className="m-10">
      <Heading size="8" className="mt-10">
        Budgets
      </Heading>
      <Grid columns={{ initial: "1", md: "3" }} gap="5" className="mt-5">
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
        <BudgetCard category="ENTERTAINMENT" total={5000} spend={1100} />
      </Grid>
    </Box>
  );
}

export default budgetsPage;
