import prisma from "@/prisma/client";
import { Box, Button, Dialog, Heading, Table } from "@radix-ui/themes";
import ExpenseBadge from "./ExpenseBadge";
import { MdOutlineAddToPhotos } from "react-icons/md";
import NewExpenseDialog from "./NewExpenseDialog";

async function ExpensesPage() {
  const expenses = await prisma.expense.findMany();

  return (
    <Box className="m-10">
      <Heading size="8" className="mt-10">
        Expenses
      </Heading>
      <Box className="mt-5 space-y-3">
        <NewExpenseDialog />
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Title
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {expenses.map((expense) => (
              <Table.Row key={expense.id}>
                <Table.Cell className="hidden md:table-cell">
                  {expense.title}
                </Table.Cell>
                <Table.Cell className="text-nowrap">
                  ${expense.amount}
                </Table.Cell>
                <Table.Cell>
                  <span className="md:hidden">
                    {expense.date.toLocaleString("en-GB", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="hidden md:block">
                    {expense.date.toDateString()}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  {expense.category && (
                    <ExpenseBadge category={expense.category} />
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}

export const dynamic = "force-dynamic";

export default ExpensesPage;
