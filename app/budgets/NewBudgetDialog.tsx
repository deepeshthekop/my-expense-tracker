"use client";

import { Budget, Category } from "@prisma/client";
import {
  Box,
  Button,
  Dialog,
  DropdownMenu,
  Flex,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaDollarSign, FaPlus } from "react-icons/fa";
import { BudgetSchema } from "../api/budgets/route";

const allBudgets = Object.values(Category);

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
  const router = useRouter();

  const addBudget = async () => {
    const data = {
      type: selectedBudget,
      capacity: parseInt(amount),
    };

    const validation = BudgetSchema.safeParse(data);

    if (!validation.success)
      console.log(validation.error.flatten().fieldErrors);
    else {
      await axios
        .post("/api/budgets/", data)
        .then(() => {
          router.refresh();
          setIsOpen(false);
        })
        .catch((e) => console.log(e))
        .finally(() => {});
    }
  };

  if (availableBudgets.length === 0) return null;

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger>
        <IconButton
          variant="soft"
          className="border-2 border-dashed w-full h-[150px]"
          onClick={() => {
            setIsOpen(true);
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
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft" className="mt-2">
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
              <FaDollarSign />
            </TextField.Slot>
          </TextField.Root>
        </Box>
        <Flex justify="end" gap="2" className="mt-7">
          <Button color="gray" variant="soft" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={addBudget}>Add</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default NewBudgetDialog;
