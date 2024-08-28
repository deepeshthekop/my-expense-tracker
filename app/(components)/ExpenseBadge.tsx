import { Category } from "@prisma/client";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { Avatar, Badge, Text } from "@radix-ui/themes";

export const colorMap: Record<
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
    emoji: string;
  }
> = {
  HOME: { label: "Home", color: "blue", emoji: "🏠" },
  UTILITIES: { label: "Utilities", color: "crimson", emoji: "💡" },
  TRANSPORT: { label: "Transport", color: "gold", emoji: "🚗" },
  GROCERIES: { label: "Groceries", color: "green", emoji: "🛒" },
  HEALTH: { label: "Health", color: "mint", emoji: "💊" },
  SHOPPING: { label: "Shopping", color: "orange", emoji: "🛍️" },
  ENTERTAINMENT: { label: "Entertainment", color: "purple", emoji: "🍿" },
  INSAURANCE: { label: "Insaurance", color: "red", emoji: "🛡️" },
  LOAN: { label: "Loan", color: "teal", emoji: "💰" },
  SUBSCRIPTIONS: { label: "Subscriptions", color: "yellow", emoji: "📺" },
  DINING: { label: "Dining", color: "blue", emoji: "🍽️" },
  GROOMING: { label: "Grooming", color: "crimson", emoji: "💇‍♀️" },
  EDUCATION: { label: "Education", color: "gold", emoji: "📚" },
  GIVING: { label: "Giving", color: "green", emoji: "🎁" },
  CASH: { label: "Cash", color: "mint", emoji: "💵" },
  CHARGES: { label: "Charges", color: "orange", emoji: "💲" },
  TRAVEL: { label: "Travel", color: "purple", emoji: "✈️" },
};

function ExpenseBadge({ category }: { category: Category }) {
  return (
    <Badge color={colorMap[category].color} size="2" className="text-sm">
      <BookmarkIcon />
      {colorMap[category].label}
    </Badge>
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
