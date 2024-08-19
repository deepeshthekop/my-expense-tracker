import { Category } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const colorMap: Record<
  Category,
  {
    label: string;
    color:
      | "yellow"
      | "orange"
      | "red"
      | "purple"
      | "blue"
      | "green"
      | "teal"
      | "mint"
      | "crimson"
      | "gold";
  }
> = {
  RENT: { label: "Rent", color: "crimson" },
  UTILITIES: { label: "Utilities", color: "mint" },
  MAINTAINENCE: { label: "Maintainence", color: "red" },
  TRANSPORT: { label: "Transport", color: "yellow" },
  GROCERIES: { label: "Groceries", color: "purple" },
  HEALTH: { label: "Health", color: "teal" },
  SHOPPING: { label: "Shopping", color: "blue" },
  FOOD: { label: "Food", color: "green" },
  ENTERTAINMENT: { label: "Entertainment", color: "orange" },
  MISCELLANEOUS: { label: "Miscellaneous", color: "gold" },
};

function ExpenseBadge({ category }: { category: Category }) {
  return (
    <Badge color={colorMap[category].color}>{colorMap[category].label}</Badge>
  );
}

export default ExpenseBadge;
