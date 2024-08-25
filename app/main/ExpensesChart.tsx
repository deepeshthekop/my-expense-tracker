"use client";

import { Expense } from "@prisma/client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
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
      <Box className="space-y-1 rounded-lg border bg-[var(--gray-1)] border-[var(--gray-5)] p-2">
        <Text className="text-[var(--gray-11)]">
          {label.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Text>
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
      <Text className="text-2xl" weight="bold">
        Your Last 7 Expenses
      </Text>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="pt-5 pb-10 text-xs [&_.recharts-cartesian-axis-tick_text]:fill-[var(--gray-11)] [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-[var(--gray-6)] [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-[var(--color-panel-translucent)]"
      >
        {data.length === 0 ? (
          <Flex justify="center" align="center" className="h-[200px]">
            <Text className="text-base md:text-lg text">
              No recent expenses.
            </Text>
          </Flex>
        ) : (
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(date: any) =>
                date.toLocaleDateString("en-GB", {
                  month: "short",
                  day: "2-digit",
                })
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="amount"
              fill="var(--accent-11)"
              className="rounded-lg"
              barSize={60}
              radius={10}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
}

export default ExpensesChart;
