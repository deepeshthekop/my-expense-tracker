import { Expense } from "@prisma/client";
import { Text, Flex, Table } from "@radix-ui/themes";
import NewExpenseDialog from "../main/expenses/NewExpenseDialog";
import ExpenseBadge from "./ExpenseBadge";

function ExpensesTable({
  userId,
  expenses,
}: {
  userId: string;
  expenses: Expense[];
}) {
  return (
    <>
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
            <Table.ColumnHeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {expenses.map((expense) => (
            <Table.Row key={expense.id} className="h-20">
              <Table.Cell>
                <Flex align="center" className="h-full">
                  {expense.date.toLocaleDateString("en-GB", {
                    month: "short",
                    day: "numeric",
                  })}
                </Flex>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Flex align="center" className="h-full">
                  {expense.title}
                </Flex>
              </Table.Cell>
              <Table.Cell>
                <Flex align="center" className="h-full">
                  {expense.category && (
                    <ExpenseBadge category={expense.category} />
                  )}
                </Flex>
              </Table.Cell>
              <Table.Cell className="text-nowrap">
                <Flex align="center" className="h-full">
                  ${expense.amount}
                </Flex>
              </Table.Cell>
              <Table.Cell>
                <Flex align="center" className="h-full">
                  <NewExpenseDialog userId={userId} expense={expense} />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      {expenses.length === 0 && (
        <Text as="p" align="center" weight="bold" className="mt-10 text-xl">
          No Expenses
        </Text>
      )}
    </>
  );
}

export default ExpensesTable;
