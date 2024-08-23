"use client";

import { BudgetPatchSchema } from "@/app/api/budgets/[id]/route";
import { Budget } from "@prisma/client";
import { ExclamationTriangleIcon, Pencil1Icon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  Dialog,
  Flex,
  TextField,
} from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";

function EditBudgetButton({ budget }: { budget: Budget }) {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [open, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);

  const updateBudget = async () => {
    const data = {
      capacity: parseInt(amount),
    };

    const validation = BudgetPatchSchema.safeParse(data);

    if (!validation.success) setError("Please enter a valid budget.");
    else {
      setIsLoading(true);
      await axios
        .patch(`/api/budgets/${budget.id}`, data)
        .then(() => {
          router.refresh();
          setIsOpen(false);
        })
        .catch((error: AxiosError) => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <Dialog.Root open={open}>
      <Button
        color="blue"
        loading={isLoading}
        onClick={() => {
          setAmount("");
          setIsOpen(true);
        }}
      >
        <Pencil1Icon />
        Edit
      </Button>
      <Dialog.Content className="min-w-fit w-[300px]">
        <Dialog.Title>Edit Budget</Dialog.Title>
        <Box>
          {error && (
            <Callout.Root color="red" className="p-2 text-xs">
              <Callout.Icon>
                <ExclamationTriangleIcon />
              </Callout.Icon>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
          <TextField.Root
            className="mt-3"
            placeholder="New Budget"
            onChange={(e) => setAmount(e.target.value)}
          >
            <TextField.Slot>
              <BsCurrencyDollar />
            </TextField.Slot>
          </TextField.Root>
        </Box>
        <Flex justify="end" gapX="2" className="mt-5">
          <Button
            variant="soft"
            color="gray"
            loading={isLoading}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={updateBudget} loading={isLoading}>
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default EditBudgetButton;
