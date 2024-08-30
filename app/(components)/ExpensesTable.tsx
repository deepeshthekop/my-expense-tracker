"use client";

import { Expense } from "@prisma/client";
import { Text, Flex, Table } from "@radix-ui/themes";
import NewExpenseDialog from "../main/expenses/NewExpenseDialog";
import ExpenseBadge from "./ExpenseBadge";
import Direction from "./Direction";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

function ExpensesTable({
  userId,
  expenses,
}: {
  userId: string;
  expenses: Expense[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentDirection = searchParams.get("direction")
    ? searchParams.get("direction") === "asc"
      ? "asc"
      : "desc"
    : undefined;

  const setSorting = (
    by: "date" | "title" | "amount",
    direction: "asc" | "desc"
  ) => {
    const params = new URLSearchParams(searchParams);

    if (searchParams.get("sort") && searchParams.get("sort") === by) {
      if (searchParams.get("direction") === "asc")
        params.set("direction", "desc");
      else {
        params.delete("page");
        params.delete("direction");
        params.delete("sort");
        params.delete("by");
      }
    } else {
      params.delete("page");
      params.set("sort", by);
      params.set("direction", direction);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <Table.Root size="2">
        <Table.Header>
          <Table.Row className="text-[var(--gray-11)]">
            <Table.ColumnHeaderCell className="font-medium">
              <Flex
                align="center"
                gapX="2"
                onClick={() => setSorting("date", "asc")}
                className="cursor-pointer"
              >
                <Text>Date</Text>
                <Direction
                  direction={
                    searchParams.get("sort") === "date" && currentDirection
                      ? currentDirection
                      : undefined
                  }
                />
              </Flex>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="font-medium hidden md:table-cell">
              <Flex
                align="center"
                gapX="2"
                onClick={() => setSorting("title", "asc")}
                className="cursor-pointer"
              >
                <Text>Title</Text>
                <Direction
                  direction={
                    searchParams.get("sort") === "title" && currentDirection
                      ? currentDirection
                      : undefined
                  }
                />
              </Flex>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="font-medium">
              Category
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="font-medium">
              <Flex
                align="center"
                gapX="2"
                onClick={() => setSorting("amount", "asc")}
                className="cursor-pointer"
              >
                <Text>Amount</Text>
                <Direction
                  direction={
                    searchParams.get("sort") === "amount" && currentDirection
                      ? currentDirection
                      : undefined
                  }
                />
              </Flex>
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
