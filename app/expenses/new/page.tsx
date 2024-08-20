import { Box, Heading } from "@radix-ui/themes";
import React from "react";
import ExpenseFormData from "../ExpenseFormData";

function NewExpensePage() {
  return (
    <Box className="m-10">
      <Heading size="8" className="mt-10">
        New Expense
      </Heading>
      <ExpenseFormData />
    </Box>
  );
}

export default NewExpensePage;
