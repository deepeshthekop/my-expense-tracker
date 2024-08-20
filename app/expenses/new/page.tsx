"use client";

import { ExpenseSchema } from "@/app/api/expenses/route";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import {
  Box,
  Button,
  Card,
  DropdownMenu,
  Flex,
  Heading,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

type ExpenseFormData = z.infer<typeof ExpenseSchema>;

function NewExpensePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(ExpenseSchema),
  });

  return (
    <Box className="m-10">
      <Heading size="8" className="mt-10">
        New Expense
      </Heading>
      <Card size="3" className="mx-auto mt-10 min-w-fit max-w-[400px]">
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

        <form
          className="mt-5"
          onSubmit={handleSubmit(async (data) => {
            setIsLoading(true);

            const newExpense: ExpenseFormData = {
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
              })
              .catch((e: AxiosError) => {
                console.log(e.message);
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
                disabled={isLoading}
                size="3"
              />
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
                disabled={isLoading}
                className="w-full h-32"
                size="3"
              />
              <Text color="red" size="1">
                {errors.title?.message}
              </Text>
            </label>
            <Button loading={isLoading}>Add</Button>
          </Flex>
        </form>
      </Card>
      <Toaster
        toastOptions={{
          className:
            "border border-[var(--gray-5)] bg-[var(--gray-2)] text-[var(--gray-12)]",
        }}
      />
    </Box>
  );
}

export default NewExpensePage;
