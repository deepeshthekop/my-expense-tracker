"use client";

import { Budget } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function DeleteBudgetButton({ budget }: { budget: Budget }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const deleteBudget = async () => {
    setIsLoading(true);

    await axios
      .delete(`/api/budgets/${budget.id}`)
      .then(() => {
        router.push("/budgets");
      })
      .catch(() => toast.error("An unexpected error occured."))
      .finally(() => setIsLoading(false));
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" loading={isLoading}>
          <TrashIcon />
          Delete
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete Budget</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this budget? This action is
          irreversible.
        </AlertDialog.Description>
        <Flex justify="end" gapX="2" className="mt-5">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" loading={isLoading}>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" onClick={deleteBudget} loading={isLoading}>
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default DeleteBudgetButton;
