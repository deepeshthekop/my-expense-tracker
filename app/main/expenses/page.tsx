import ExpensesTable from "@/app/(components)/ExpensesTable";
import { getExpenses } from "@/app/main/utils";
import { Box, Button, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { MdOutlineAddToPhotos } from "react-icons/md";
import NewExpenseDialog from "./NewExpenseDialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";

async function ExpensesPage() {
  const session = await getServerSession(authOptions);
  const expenses = await getExpenses();

  return (
    <Box className="m-10">
      <Heading size="8" className="mt-10">
        Expenses
      </Heading>
      <Box className="mt-5 space-y-3">
        <NewExpenseDialog userId={session?.user.id!} />
        <ExpensesTable expenses={expenses!} />
      </Box>
    </Box>
  );
}

export const dynamic = "force-dynamic";

export default ExpensesPage;
