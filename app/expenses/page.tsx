import prisma from "@/prisma/client";
import { Box, Heading, Text, Table } from "@radix-ui/themes";
import exp from "constants";

async function ExpensesPage() {
  const expenses = await prisma.expense.findMany();

  return (
    <Box className="m-10">
      <Heading size="8" className="mt-10">
        Expenses
      </Heading>
      <Table.Root variant="surface" className="mt-5">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {expenses.map((expense) => (
            <Table.Row key={expense.id}>
              <Table.Cell>$ {expense.amount}</Table.Cell>
              <Table.Cell>{expense.date.toDateString()}</Table.Cell>
              <Table.Cell>{expense.title}</Table.Cell>
              <Table.Cell>{expense.category}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

export default ExpensesPage;
