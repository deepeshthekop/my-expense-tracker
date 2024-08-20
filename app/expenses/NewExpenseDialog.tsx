"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Expense } from "@prisma/client";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  DropdownMenu,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { z } from "zod";
import { ExpenseSchema } from "../api/expenses/route";

type ExpenseFormData = z.infer<typeof ExpenseSchema>;

function NewExpenseDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>();

  const closeDialog = () => {
    if (!isLoading) {
      reset();
      setIsOpen(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(ExpenseSchema),
  });

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger>
        <Button
          className="cursor-pointer"
          onClick={() => {
            setIsOpen(true);
            setTitleText("");
            setSelectedCategory(null);
          }}
        >
          <MdOutlineAddToPhotos /> Add Expense
        </Button>
      </Dialog.Trigger>
      <Dialog.Content
        onEscapeKeyDown={closeDialog}
        onInteractOutside={closeDialog}
        className="w-fit"
        aria-describedby={undefined}
      >
        <Dialog.Title>New Expense</Dialog.Title>

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
          className="mt-1"
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
              .then((expense) => {
                closeDialog();
                toast.success("Expense has been added!", {
                  icon: <CheckIcon scale="5" />,
                  duration: 3000,
                });
              })
              .catch((e: AxiosError) => {
                console.log(e.message);
              })
              .finally(() => setIsLoading(false));
          })}
        >
          <Flex direction="column" gapY="3">
            <label>
              <Text className="text-sm">Amount</Text>
              <TextField.Root
                {...register("amount")}
                type="number"
                placeholder="Your expense"
                disabled={isLoading}
              />
              <Text color="red" size="1">
                {errors.amount?.message}
              </Text>
            </label>
            <label>
              <Flex justify="between" align="baseline" className="w-full">
                <Text className="text-sm">Title</Text>
                <Text className="text-xs text-[var(--gray-9)]">
                  {titleText.length} Characters
                </Text>
              </Flex>
              <TextArea
                {...register("title")}
                onChange={(e) => setTitleText(e.target.value)}
                variant="surface"
                placeholder="Your expense title."
                disabled={isLoading}
                className="w-64 h-32"
              />
              <Text color="red" size="1">
                {errors.title?.message}
              </Text>
            </label>
            <Flex justify="end" gapX="3">
              <Button
                type="button"
                color="gray"
                variant="soft"
                disabled={isLoading}
                onClick={closeDialog}
              >
                Cancel
              </Button>
              <Button loading={isLoading}>Add</Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
      <Toaster
        toastOptions={{
          className:
            "border border-[var(--gray-5)] bg-[var(--gray-2)] text-[var(--gray-12)]",
        }}
      />
    </Dialog.Root>
  );
}

export default NewExpenseDialog;
