"use client";
import { Avatar, Card, Flex, Text } from "@radix-ui/themes";
import { ReactNode } from "react";
import CountUp from "react-countup";

function GlanceCard({
  title,
  amount,
  icon,
  popover,
}: {
  title: string;
  amount: number;
  icon: NonNullable<ReactNode>;
  popover?: ReactNode;
}) {
  return (
    <Card>
      <Flex className="p-2" align="center" justify="between">
        <Flex className="space-y-2" direction="column">
          <Flex align="center" gapX="3">
            <Text as="p" className="text-xl">
              {title}
            </Text>
            {popover}
          </Flex>
          <Text
            as="p"
            color={amount < 0 ? "red" : undefined}
            className="text-3xl"
            weight="bold"
          >
            $ <CountUp end={amount} duration={2} />
          </Text>
        </Flex>
        <Avatar size="5" radius="full" fallback={icon} />
      </Flex>
    </Card>
  );
}

export default GlanceCard;
