"use client";

import ExpenseBadge from "@/app/(components)/ExpenseBadge";
import { ExpenseSchema } from "@/app/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Expense } from "@prisma/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Dialog,
  DropdownMenu,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { z } from "zod";

type ExpenseFormData = z.infer<typeof ExpenseSchema>;

function NewExpenseDialog({
  userId,
  expense,
}: {
  userId: string;
  expense?: Expense;
}) {
  const [open, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(ExpenseSchema),
  });

  const titleText = watch("title", expense ? expense.title : "");
  setValue("userId", userId);

  const deleteExpense = (expense: Expense) => {
    setIsLoading(true);
    axios
      .delete(`/api/expenses/${expense.id}`, {
        data: {
          userId: userId,
        },
      })
      .then(() => {
        router.refresh();
        setIsOpen(false);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  return (
    <Dialog.Root open={open}>
      <Button
        onClick={() => {
          setIsOpen(true);
          setSelectedCategory(expense ? expense.category : null);
          if (!expense) reset();
        }}
        variant={expense && "ghost"}
      >
        {expense ? (
          <DotsHorizontalIcon />
        ) : (
          <>
            <FaPlus />
            <Text>Add New Expense</Text>
          </>
        )}
      </Button>
      <Dialog.Content
        className="min-w-fit max-w-[400px]"
        onInteractOutside={() => setIsOpen(false)}
        aria-describedby={undefined}
      >
        <Dialog.Title>
          {expense ? (
            <Flex justify="between">
              <Text as="div">{expense.date.toLocaleDateString("en-GB")}</Text>
              <Button
                loading={isLoading}
                color="red"
                onClick={() => deleteExpense(expense)}
              >
                Delete
              </Button>
            </Flex>
          ) : (
            "New Expense"
          )}
        </Dialog.Title>
        <Box>
          {expense ? (
            expense.category && <ExpenseBadge category={expense.category} />
          ) : (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger disabled={isLoading} className="my-2">
                <Button variant="soft">
                  {selectedCategory || "Category"}
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content variant="soft">
                <DropdownMenu.Item onClick={() => setSelectedCategory(null)}>
                  None
                </DropdownMenu.Item>
                {Object.values(Category).map((category) => (
                  <DropdownMenu.Item
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          <form
            className="mt-3"
            onSubmit={handleSubmit((data) => {
              setIsLoading(true);

              const newExpense: ExpenseFormData = {
                userId: data.userId,
                title: data.title,
                amount: data.amount,
              };

              if (selectedCategory !== null)
                newExpense.category = selectedCategory!;

              axios
                .post("/api/expenses", newExpense)
                .then(() => {
                  router.refresh();
                  setIsOpen(false);
                })
                .catch((e) => console.log(e))
                .finally(() => setIsLoading(false));
            })}
          >
            <Flex direction="column" gapY="4">
              <label>
                <Text className="text-md">Amount</Text>
                <TextField.Root
                  {...register("amount")}
                  defaultValue={expense?.amount || ""}
                  type="number"
                  placeholder="Your expense"
                  size="3"
                  disabled={isLoading || (expense && true)}
                >
                  <TextField.Slot>
                    <BsCurrencyDollar />
                  </TextField.Slot>
                </TextField.Root>
                <Text color="red" size="1">
                  {errors.amount?.message}
                </Text>
              </label>
              <label>
                <Flex justify="between" align="baseline" className="w-full">
                  <Text className="text-md">Title</Text>
                  <Text className="text-xs text-[var(--gray-9)]">
                    {titleText.length} Characters
                  </Text>
                </Flex>
                <TextArea
                  {...register("title")}
                  defaultValue={expense?.title || ""}
                  variant="surface"
                  placeholder="Your expense title"
                  disabled={isLoading || (expense && true)}
                  className="w-full h-32"
                  size="3"
                />
                <Text color="red" size="1">
                  {errors.title?.message}
                </Text>
              </label>
              <Flex justify="end" gap="2">
                <Button
                  type="button"
                  color="gray"
                  variant="soft"
                  onClick={() => setIsOpen(false)}
                >
                  {expense ? "Close" : "Cancel"}
                </Button>
                {!expense && <Button loading={isLoading}>Add</Button>}
              </Flex>
            </Flex>
          </form>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default NewExpenseDialog;
