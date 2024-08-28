import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import { getBudgets, getExpenses, getUser } from "../utils";
import { signOut } from "next-auth/react";
import SignOutButton from "./SignOutButton";

async function page() {
  const [user, expenses, budgets] = await Promise.all([
    getUser(),
    getExpenses(),
    getBudgets(),
  ]);

  const maxExpense = expenses?.reduce(
    (a, expense) => Math.max(a, expense.amount),
    0
  );

  return (
    <Box className="m-5 md:m-10">
      <Heading size="8" className="mt-10">
        Account
      </Heading>
      <Card className="mx-auto mt-10 min-w-fit max-w-[500px] p-5">
        <Flex direction="column" align="center" gap="3">
          <Avatar
            size="7"
            radius="full"
            src={user?.image!}
            fallback="?"
            className="p-1 border-2 border-[var(--accent-9)]"
          />
          <Heading size="7">{user?.name!}</Heading>
        </Flex>
        <Text as="p" align="center" className="text-[var(--gray-11)]">
          User since{" "}
          {user?.createdAt.toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Text>
        <Separator className="w-full mt-3" />
        <Box className="my-7 space-y-2">
          <div>
            <Text className="text-[var(--gray-11)]">Email: </Text>
            <Text> {user?.email}</Text>
          </div>
          <div>
            <Text className="text-[var(--gray-11)]">Expenses created: </Text>
            <Text> {expenses?.length}</Text>
          </div>
          <div>
            <Text className="text-[var(--gray-11)]">Max expense: </Text>
            <Text> $ {maxExpense}</Text>
          </div>
          <div>
            <Text className="text-[var(--gray-11)]">Budgets added: </Text>
            <Text> {budgets?.length}</Text>
          </div>
        </Box>
        <SignOutButton />
      </Card>
    </Box>
  );
}

export default page;
