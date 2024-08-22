"use client";

import { Budget, Category } from "@prisma/client";
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
  TextField,
} from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { BudgetSchema } from "../api/budgets/route";

function NewBudgetDialog({ budgetsInUse }: { budgetsInUse: Budget[] }) {
  const usedBudgets = budgetsInUse.map((budgetInUse) => budgetInUse.type);

  let availableBudgets: Category[] = [];

  let budget: Category;
  for (budget in Category) {
    if (!usedBudgets.includes(budget))
      availableBudgets = [...availableBudgets, budget];
  }

  const [selectedBudget, setSelectedBudget] = useState(availableBudgets[0]);
  const [amount, setAmount] = useState("");
  const [open, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const addBudget = async () => {
    const data = {
      type: selectedBudget,
      capacity: parseInt(amount),
    };

    const validation = BudgetSchema.safeParse(data);

    if (!validation.success) setError("Please enter a valid amount.");
    else {
      setError(null);
      setIsLoading(true);
      await axios
        .post("/api/budgets/", data)
        .then(() => {
          router.refresh();
          setIsOpen(false);
        })
        .catch((e: AxiosError) => setError(e.message))
        .finally(() => setIsLoading(false));
    }
  };

  if (availableBudgets.length === 0) return null;

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger>
        <IconButton
          variant="soft"
          className="border-2 border-dashed w-full h-[150px] cursor-pointer transition-colors"
          onClick={() => {
            setIsOpen(true);
            setAmount("");
            setSelectedBudget(availableBudgets[0]);
          }}
        >
          <Flex direction="column" align="center" gap="2">
            <FaPlus size={32} />
            <Text>Add New Budget</Text>
          </Flex>
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content
        className="min-w-fit w-[300px]"
        onInteractOutside={() => setIsOpen(false)}
        aria-describedby={undefined}
      >
        <Dialog.Title>New Budget</Dialog.Title>
        <Box>
          {error && (
            <Callout.Root color="red" className="p-2 text-xs">
              <Callout.Icon>
                <ExclamationTriangleIcon />
              </Callout.Icon>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft" className="mt-2" disabled={isLoading}>
                {selectedBudget} <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {availableBudgets.map((category) => (
                <DropdownMenu.Item
                  key={category}
                  onClick={() => setSelectedBudget(category)}
                >
                  {category}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <TextField.Root
            className="mt-3"
            placeholder="Budget"
            onChange={(e) => setAmount(e.target.value)}
          >
            <TextField.Slot>
              <BsCurrencyDollar />
            </TextField.Slot>
          </TextField.Root>
        </Box>
        <Flex justify="end" gap="2" className="mt-7">
          <Button
            color="gray"
            variant="soft"
            disabled={isLoading}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={addBudget} loading={isLoading}>
            Add
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default NewBudgetDialog;
