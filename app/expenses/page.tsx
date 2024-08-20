import prisma from "@/prisma/client";
import { Box, Button, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { MdOutlineAddToPhotos } from "react-icons/md";
import ExpenseBadge from "./ExpenseBadge";

async function ExpensesPage() {
  const expenses = await prisma.expense.findMany();

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
                  <Link
                    className="md:border-b border-dashed border-[var(--gray-12)]"
                    href={`expenses/${expense.id}`}
                  >
                    {expense.title}
                  </Link>
                </Table.Cell>
                <Table.Cell className="text-nowrap">
                  <Link
                    href={`expenses/${expense.id}`}
                    className="border-b border-dashed border-[var(--gray-12)] md:border-none"
                  >
                    ${expense.amount}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <span className="md:hidden">
                    {expense.date.toLocaleDateString("en-GB")}
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
