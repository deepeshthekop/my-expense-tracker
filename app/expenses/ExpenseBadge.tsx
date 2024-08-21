import { Category } from "@prisma/client";
import { Avatar, Badge, Text } from "@radix-ui/themes";

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
    emoji: "🏠" | "💡" | "🛠️" | "🚗" | "🛒" | "💊" | "🛍️" | "🍔" | "🎉" | "🔖";
  }
> = {
  RENT: { label: "Rent", color: "crimson", emoji: "🏠" },
  UTILITIES: { label: "Utilities", color: "mint", emoji: "💡" },
  MAINTAINENCE: { label: "Maintainence", color: "red", emoji: "🛠️" },
  TRANSPORT: { label: "Transport", color: "yellow", emoji: "🚗" },
  GROCERIES: { label: "Groceries", color: "purple", emoji: "🛒" },
  HEALTH: { label: "Health", color: "teal", emoji: "💊" },
  SHOPPING: { label: "Shopping", color: "blue", emoji: "🛍️" },
  FOOD: { label: "Food", color: "green", emoji: "🍔" },
  ENTERTAINMENT: { label: "Entertainment", color: "orange", emoji: "🎉" },
  MISCELLANEOUS: { label: "Miscellaneous", color: "gold", emoji: "🔖" },
};

function ExpenseBadge({ category }: { category: Category }) {
  return (
    <Badge color={colorMap[category].color}>{colorMap[category].label}</Badge>
  );
}

export function ExpenseIcon({ category }: { category: Category }) {
  return (
    <Avatar
      radius="full"
      fallback={<Text size="8">{colorMap[category].emoji}</Text>}
      size="5"
    />
  );
}

export default ExpenseBadge;
