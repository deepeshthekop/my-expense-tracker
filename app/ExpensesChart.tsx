"use client";

import { Expense } from "@prisma/client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

function CustomTooltip({
  payload,
  label,
  active,
}: {
  payload?: any;
  label?: any;
  active?: any;
}) {
  if (active) {
    return (
      <Box className="rounded-lg border bg-[var(--gray-1)] border-[var(--gray-5)] p-2">
        <Text className="text-[var(--gray-11)]">{label}</Text>
        <Flex justify="between" gapX="5">
          <Flex gapX="1" align="center">
            <Box className={"rounded-sm w-2 h-2 bg-[var(--accent-11)]"} />
            Expense
          </Flex>
          <Text>$ {payload[0].value}</Text>
        </Flex>
      </Box>
    );
  }
  return null;
}

function ExpensesChart({ data }: { data: Expense[] }) {
  return (
    <Card className="p-5 w-full space-y-3 h-[350px]">
      <Text className="text-xl">Your Last 7 transactions</Text>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="p-5 text-xs [&_.recharts-cartesian-axis-tick_text]:fill-[var(--gray-11)] [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-[var(--gray-6)] [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-[var(--color-panel-translucent)]"
      >
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={(expense: Expense) =>
              expense.date.toLocaleDateString("en-GB", {
                month: "short",
                day: "2-digit",
              })
            }
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="amount"
            fill="var(--accent-11)"
            className="rounded-lg"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default ExpensesChart;
