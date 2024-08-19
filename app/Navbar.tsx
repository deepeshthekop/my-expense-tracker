"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useThemeContext,
} from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Logo from "./Logo";
import { FiHome, FiPieChart } from "react-icons/fi";
import { TbCashRegister } from "react-icons/tb";
import { SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <Box
      gridArea="nav"
      className="h-[65px] border-b bg-[var(--gray-2)] border-[var(--gray-5)]"
    >
      <Flex justify="between" align="center" className="h-full mx-5">
        <Button
          variant="soft"
          onClick={() => setIsOpen(true)}
          className="xl:hidden"
        >
          <IoMdMenu size={20} />
        </Button>
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          direction="left"
          overlayOpacity={0.7}
          className="border-r bg-[var(--gray-2)] border-[var(--gray-5)]"
        >
          <Container className="p-5">
            <Logo />
            <Flex direction="column" gapY="5" className="my-5">
              <Link
                href="/"
                className="flex items-center space-x-2 transition-colors text-[var(--gray-11)] hover:text-[var(--accent-9)]"
              >
                <FiHome size={22} /> <Text className="text-lg">Dashboard</Text>
              </Link>
              <Link
                href="/expenses"
                className="flex items-center space-x-2 transition-colors text-[var(--gray-11)] hover:text-[var(--accent-9)]"
              >
                <TbCashRegister size={22} />
                <Text className="text-lg">Expenses</Text>
              </Link>
              <Link
                href="/budgets"
                className="flex items-center space-x-2 transition-colors text-[var(--gray-11)] hover:text-[var(--accent-9)]"
              >
                <FiPieChart size={22} />{" "}
                <Text className="text-lg">Budgets</Text>
              </Link>
            </Flex>
          </Container>
        </Drawer>
        <Button
          variant="soft"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <SunIcon />
        </Button>
      </Flex>
    </Box>
  );
}

export default Navbar;
