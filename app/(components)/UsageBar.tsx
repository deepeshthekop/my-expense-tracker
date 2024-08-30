import { Flex, Progress, Text } from "@radix-ui/themes";
import React from "react";

function UseageBar({ spend, total }: { spend: number; total: number }) {
  const isOverBudget = spend > total;

  return (
    <Flex direction="column" gap="2">
      <Flex justify="between">
        <Text
          className={`text-sm ${
            isOverBudget ? "text-red-500" : "text-[var(--gray-11)]"
          }`}
        >
          $ {parseFloat(spend.toFixed(2))} Spend
        </Text>
        <Text className="text-sm text-[var(--gray-11)]">
          $ {isOverBudget ? 0 : parseFloat((total - spend).toFixed(2))}{" "}
          Remaining
        </Text>
      </Flex>
      <Progress
        color={isOverBudget ? "red" : undefined}
        value={isOverBudget ? 100 : (spend / total) * 100}
      />
    </Flex>
  );
}

export default UseageBar;
