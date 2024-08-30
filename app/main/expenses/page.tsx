import ExpensesTable from "@/app/(components)/ExpensesTable";
import { authOptions } from "@/app/auth";
import { getExpenses } from "@/app/main/utils";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import NewExpenseDialog from "./NewExpenseDialog";
import { Category, Expense } from "@prisma/client";
import Pagination from "@/app/(components)/Pagination";
import SortByCategory from "@/app/(components)/SortByCategory";

const validSort = ["amount", "title", "date"];

async function ExpensesPage({
  searchParams,
}: {
  searchParams: {
    category?: Category;
    sort?: keyof Expense;
    direction?: "asc" | "desc";
    page?: string;
  };
}) {
  const session = await getServerSession(authOptions);

  const category =
    searchParams.category &&
    Object.values(Category).includes(searchParams.category)
      ? searchParams.category
      : undefined;

  const by =
    searchParams.sort && validSort.includes(searchParams.sort)
      ? searchParams.sort
      : undefined;
  const direction =
    searchParams.direction && ["asc", "desc"].includes(searchParams.direction)
      ? searchParams.direction
      : "desc";

  const sorting = {
    by,
    direction,
  };

  const page =
    searchParams.page && parseInt(searchParams.page) > 0
      ? parseInt(searchParams.page)
      : 1;
  const pageSize = 8;

  const [expenses, allExpenses] = await Promise.all([
    getExpenses({ pageSize, page, category, sorting }),
    getExpenses({ category }),
  ]);

  const pages = Math.ceil(allExpenses.length / pageSize);

  return (
    <Box className="m-5 md:m-10">
      <Heading size="8" className="mt-10">
        Expenses
      </Heading>
      <Box className="mt-5 space-y-5">
        <Flex justify="between" align="center">
          <NewExpenseDialog userId={session?.user.id!} />
          <SortByCategory />
        </Flex>
        <ExpensesTable userId={session?.user.id!} expenses={expenses!} />
        <Pagination page={page} pages={pages} />
      </Box>
    </Box>
  );
}

export const dynamic = "force-dynamic";

export default ExpensesPage;
