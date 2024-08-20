import prisma from "@/prisma/client";
import { Box, Grid, Text } from "@radix-ui/themes";
import { BsPiggyBank } from "react-icons/bs";
import { IoMdPaper } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import GlanceCard from "./GlanceCard";
import RecentExpensesCard from "./RecentExpensesCard";

async function App() {
  const results = await prisma.expense.findMany({
    take: 5,
    orderBy: {
      id: "desc",
    },
  });

  return (
    <Box className="m-10">
      <Text className="text-5xl" weight="bold">
        Hi, User 👋
      </Text>
      <Text size="4" as="p" color="gray" className="mt-3">
        Here are your expenses at a glance.
      </Text>
      <Grid className="my-10" gap="5">
        <Grid columns={{ initial: "1", md: "3" }} gap="5">
          <GlanceCard
            title="Total Budget"
            amount={15000}
            icon={<BsPiggyBank size={32} />}
          />
          <GlanceCard
            title="Total Spend"
            amount={4830}
            icon={<IoMdPaper size={32} />}
          />
          <GlanceCard
            title="Total Remaining"
            amount={10170}
            icon={<IoWalletOutline size={32} />}
          />
        </Grid>
        <Grid columns={{ initial: "1", md: "3" }} gap="5">
          <Box gridColumn={{ initial: "1", md: "3" }}>
            <RecentExpensesCard expenses={results} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
