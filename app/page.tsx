import prisma from "@/prisma/client";
import { Box, Grid, Text } from "@radix-ui/themes";
import { BsPiggyBank } from "react-icons/bs";
import { IoMdPaper } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import ExpensesChart from "./ExpensesChart";
import GlanceCard from "./GlanceCard";
import RecentExpensesCard from "./RecentExpensesCard";

async function App() {
  const expenses = await prisma.expense.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const budgets = await prisma.budget.findMany();

  const totalExpense = expenses.reduce(
    (accumulator, expense) => accumulator + expense.amount,
    0
  );

  const totalBudget = budgets.reduce(
    (accumulator, budget) => accumulator + budget.capacity,
    0
  );

  const recentExpenses = expenses.slice(0, 7);

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
            amount={totalBudget}
            icon={<BsPiggyBank size={32} />}
          />
          <GlanceCard
            title="Total Spend"
            amount={totalExpense}
            icon={<IoMdPaper size={32} />}
          />
          <GlanceCard
            title="Total Remaining"
            amount={totalBudget - totalExpense}
            icon={<IoWalletOutline size={32} />}
          />
        </Grid>
        <Grid columns={{ initial: "1", md: "3" }} gap="5">
          <Box gridColumn={{ initial: "1", md: "span 2" }}>
            <ExpensesChart data={[...recentExpenses].reverse()} />
          </Box>
          <Box gridColumn={{ initial: "1", md: "3" }}>
            <RecentExpensesCard expenses={recentExpenses} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export const dynamic = "force-dynamic";

export default App;
