import { Expense } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import ExpenseBadge from "./ExpenseBadge";

function ExpensesTable({ expenses }: { expenses: Expense[] }) {
  return (
    <Table.Root size="2">
      <Table.Header>
        <Table.Row className="text-[var(--gray-11)]">
          <Table.ColumnHeaderCell className="font-medium">
            Date
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="font-medium hidden md:table-cell">
            Description
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="font-medium">
            Category
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="font-medium">
            Amount
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {expenses.map((expense) => (
          <Table.Row key={expense.id}>
            <Table.Cell py="5">
              {expense.date.toLocaleDateString("en-GB", {
                month: "short",
                day: "numeric",
              })}
            </Table.Cell>
            <Table.Cell py="5" className="hidden md:table-cell">
              <Link
                className="md:border-b border-dashed border-[var(--gray-12)]"
                href={`/main/expenses/${expense.id}`}
              >
                {expense.title}
              </Link>
            </Table.Cell>
            <Table.Cell py="5">
              {expense.category && <ExpenseBadge category={expense.category} />}
            </Table.Cell>
            <Table.Cell py="5" className="text-nowrap">
              <Link
                href={`/main/expenses/${expense.id}`}
                className="border-b border-dashed border-[var(--gray-12)] md:border-none"
              >
                ${expense.amount}
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default ExpensesTable;
