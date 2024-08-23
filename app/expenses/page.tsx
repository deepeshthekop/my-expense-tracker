import { Box, Button, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { getExpenses } from "../utils";
import ExpensesTable from "./ExpensesTable";

async function ExpensesPage() {
  const expenses = await getExpenses();

  return (
    <Box className="m-10">
      <Heading size="8" className="mt-10">
        Expenses
      </Heading>
      <Box className="mt-5 space-y-3">
        <Button className="cursor-pointer">
          <MdOutlineAddToPhotos />
          <Link href="/expenses/new">Add Expense</Link>
        </Button>
        <ExpensesTable expenses={expenses} />
      </Box>
    </Box>
  );
}

export const dynamic = "force-dynamic";

export default ExpensesPage;
