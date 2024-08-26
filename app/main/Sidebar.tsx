"use client";

import { Box, Container, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiPieChart } from "react-icons/fi";
import { TbCashRegister } from "react-icons/tb";
import Logo from "@/app/(components)/Logo";

const navItems = [
  { label: "Dashboard", icon: <FiHome />, link: "/main" },
  { label: "Expenses", icon: <TbCashRegister />, link: "/main/expenses" },
  { label: "Budgets", icon: <FiPieChart />, link: "/main/budgets" },
];

function Sidebar() {
  const currentPath = usePathname();
  return (
    <Container
      gridArea="aside"
      className="hidden border-r bg-[var(--gray-2)] border-[var(--gray-5)] xl:block h-screen sticky top-0 z-20"
    >
      <Flex direction="column" justify="center">
        <Flex
          justify="center"
          className="border-b h-[65px] border-[var(--gray-5)]"
        >
          <Logo />
        </Flex>
        <Flex direction="column" gapY="3" className="p-5">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.link}
              className={`flex items-center space-x-2 p-3 rounded-2xl ${
                currentPath === item.link
                  ? "bg-[var(--gray-5)] text-[var(--accent-9)]"
                  : "text-[var(--gray-11)]"
              } hover:text-[var(--accent-9)]`}
            >
              {item.icon}
              <Text>{item.label}</Text>
            </Link>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
}

export default Sidebar;
