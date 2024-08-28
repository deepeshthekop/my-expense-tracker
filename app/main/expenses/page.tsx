import ExpensesTable from "@/app/(components)/ExpensesTable";
import { authOptions } from "@/app/auth";
import { getExpenses } from "@/app/main/utils";
import { Box, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import NewExpenseDialog from "./NewExpenseDialog";

async function ExpensesPage() {
  const session = await getServerSession(authOptions);
  const expenses = await getExpenses();

  return (
    <Box className="m-5 md:m-10">
      <Heading size="8" className="mt-10">
        Expenses
      </Heading>
      <Box className="mt-5 space-y-3">
        <NewExpenseDialog userId={session?.user.id!} />
        <ExpensesTable userId={session?.user.id!} expenses={expenses!} />
      </Box>
    </Box>
  );
}

export const dynamic = "force-dynamic";

export default ExpensesPage;
