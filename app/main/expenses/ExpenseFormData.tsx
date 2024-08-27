"use client";

import { ExpenseSchema } from "@/app/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Expense } from "@prisma/client";
import {
  Button,
  Card,
  DropdownMenu,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import DeleteExpenseButton from "./DeleteExpense";
import ExpenseBadge from "@/app/(components)/ExpenseBadge";
import { useSession } from "next-auth/react";
import { BsCurrencyDollar } from "react-icons/bs";

type ExpenseFormData = z.infer<typeof ExpenseSchema>;

function ExpenseForm({ expense }: { expense?: Expense }) {
  const [isEditing, setIsEditing] = useState(expense ? false : true);
  const [isLoading, setIsLoading] = useState(false);
  const [titleText, setTitleText] = useState(expense ? expense.title : "");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    expense ? expense.category : null
  );

  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(ExpenseSchema),
  });

  setValue("userId", session.data?.user.id!);

  return (
    <>
      <Card size="3" className="mx-auto mt-10 min-w-fit max-w-[400px]">
        <Flex justify="between" align="center">
          {expense && !isEditing ? (
            expense.category ? (
              <ExpenseBadge category={expense.category} />
            ) : null
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
          <Flex justify="end" className="w-full">
            {expense && <DeleteExpenseButton expense={expense} />}
          </Flex>
        </Flex>
        <form
          className="mt-5"
          onSubmit={handleSubmit(async (data) => {
            setIsLoading(true);

            const newExpense: ExpenseFormData = {
              userId: data.userId,
              title: data.title,
              amount: data.amount,
            };

            if (selectedCategory !== null)
              newExpense.category = selectedCategory!;

            await axios
              .post("/api/expenses", newExpense)
              .then(() => {
                toast.success("Expense has been added!", {
                  duration: 3000,
                });
                if (!expense) reset();
              })
              .catch(() => {
                toast.error("There was an unexpected error.", {
                  duration: 3000,
                });
              })
              .finally(() => setIsLoading(false));
          })}
        >
          <Flex direction="column" gapY="4">
            <label>
              <Text className="text-md">Amount</Text>
              <TextField.Root
                {...register("amount")}
                type="number"
                placeholder="Your expense"
                size="3"
                disabled={isLoading || !isEditing}
                defaultValue={expense && expense.amount}
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
                onChange={(e) => setTitleText(e.target.value)}
                variant="surface"
                placeholder="Your expense title"
                disabled={isLoading || !isEditing}
                defaultValue={expense && expense.title}
                className="w-full h-32"
                size="3"
              />
              <Text color="red" size="1">
                {errors.title?.message}
              </Text>
            </label>
            {isEditing && (
              <Button loading={isLoading} onClick={() => console.log("hello")}>
                {expense ? "Update" : "Add"}
              </Button>
            )}
          </Flex>
        </form>
      </Card>
    </>
  );
}

export default ExpenseForm;
