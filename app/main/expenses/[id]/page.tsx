import { getSingleExpense } from "@/app/main/utils";
import { Box, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Provider from "../../Provider";
import ExpenseFormData from "../ExpenseFormData";

async function SingleExpensePage({ params }: { params: { id: string } }) {
  const expense = await getSingleExpense(params.id);

  if (!expense) return notFound();

  return (
    <Box className="m-10">
      <Heading size="8" className="mt-10">
        Expense
      </Heading>
      <Provider>
        <ExpenseFormData expense={expense} />
      </Provider>
    </Box>
  );
}

export default SingleExpensePage;
