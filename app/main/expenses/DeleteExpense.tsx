"use client";

import { Expense } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function DeleteExpenseButton({ expense }: { expense: Expense }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const deleteExpense = async () => {
    setIsLoading(true);

    await axios
      .delete(`/api/expenses/${expense.id}`)
      .then(() => {
        router.push("/main/expenses");
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
        <AlertDialog.Title>Delete Expense</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this expense? This action is
          irreversible.
        </AlertDialog.Description>
        <Flex justify="end" gapX="2" className="mt-5">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" loading={isLoading}>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" onClick={deleteExpense} loading={isLoading}>
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default DeleteExpenseButton;
