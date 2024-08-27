"use client";

import { ExpenseSchema } from "@/app/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  Dialog,
  DropdownMenu,
  Flex,
  IconButton,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { z } from "zod";

type ExpenseFormData = z.infer<typeof ExpenseSchema>;

function NewExpenseDialog({ userId }: { userId: string }) {
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

  const titleText = watch("title", "");
  setValue("userId", userId);

  return (
    <Dialog.Root open={open}>
      <Button
        onClick={() => {
          setIsOpen(true);
          setSelectedCategory(null);
          reset();
        }}
      >
        <FaPlus />
        <Text>Add New Expense</Text>
      </Button>
      <Dialog.Content
        className="min-w-fit max-w-[400px]"
        onInteractOutside={() => setIsOpen(false)}
        aria-describedby={undefined}
      >
        <Dialog.Title>New Expense</Dialog.Title>
        <Box>
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
                userId: data.userId,
                title: data.title,
                amount: data.amount,
              };

              if (selectedCategory !== null)
                newExpense.category = selectedCategory!;

              await axios
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
                  type="number"
                  placeholder="Your expense"
                  size="3"
                  disabled={isLoading}
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
              <Flex justify="end" gap="2">
                <Button color="gray" variant="soft">
                  Cancel
                </Button>
                <Button loading={isLoading}>Add</Button>
              </Flex>
            </Flex>
          </form>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default NewExpenseDialog;
