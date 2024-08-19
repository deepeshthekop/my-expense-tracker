import { Box, Container, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { FiHome, FiPieChart } from "react-icons/fi";
import { TbCashRegister } from "react-icons/tb";
import Logo from "./Logo";

function Sidebar() {
  return (
    <Container
      gridArea="aside"
      className="hidden border-r bg-[var(--gray-2)] border-[var(--gray-5)] xl:block"
    >
      <Flex direction="column" justify="center">
        <Box className="border-b h-[65px] p-5 border-[var(--gray-5)]">
          <Logo />
        </Box>
        <Flex direction="column" gapY="4" className="p-5">
          <Link
            href="/"
            className="flex items-center space-x-2 transition-colors text-[var(--gray-11)] hover:text-[var(--accent-9)]"
          >
            <FiHome /> <Text>Dashboard</Text>
          </Link>
          <Link
            href="/expenses"
            className="flex items-center space-x-2 transition-colors text-[var(--gray-11)] hover:text-[var(--accent-9)]"
          >
            <TbCashRegister />
            <Text>Expenses</Text>
          </Link>
          <Link
            href="/budgets"
            className="flex items-center space-x-2 transition-colors text-[var(--gray-11)] hover:text-[var(--accent-9)]"
          >
            <FiPieChart /> <Text>Budgets</Text>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Sidebar;
