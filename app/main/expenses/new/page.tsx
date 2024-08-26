import { Box, Heading } from "@radix-ui/themes";
import React from "react";
import ExpenseFormData from "../ExpenseFormData";
import Provider from "../../Provider";

function NewExpensePage() {
  return (
    <Box className="m-10">
      <Heading size="8" className="mt-10">
        New Expense
      </Heading>
      <Provider>
        <ExpenseFormData />
      </Provider>
    </Box>
  );
}

export default NewExpensePage;
