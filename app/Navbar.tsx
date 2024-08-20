"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Box, Button, Container, Flex, Text } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiHome, FiPieChart } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import { TbCashRegister } from "react-icons/tb";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Logo from "./Logo";
import dynamic from "next/dynamic";

const navItems = [
  { label: "Dashboard", icon: <FiHome size={22} />, link: "/" },
  { label: "Expenses", icon: <TbCashRegister size={22} />, link: "/expenses" },
  { label: "Budgets", icon: <FiPieChart size={22} />, link: "/budgets" },
];

function Navbar() {
  const currentPath = usePathname();

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
          overlayOpacity={0.8}
          className="h-full border-r bg-[var(--gray-2)] border-[var(--gray-5)]"
          size={300}
          lockBackgroundScroll
        >
          <Container className="p-5">
            <Logo />
            <Flex direction="column" gapY="3" className="my-5">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.link}
                  className={`flex items-center space-x-2 p-3 rounded-2xl ${
                    currentPath === item.link
                      ? "bg-[var(--gray-5)] text-[var(--gray-12)]"
                      : "text-[var(--gray-11)]"
                  } transition-colors hover:text-[var(--accent-9)]`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <Text className="text-lg">{item.label}</Text>
                </Link>
              ))}
            </Flex>
          </Container>
        </Drawer>

        <Button
          variant="soft"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Flex>
    </Box>
  );
}

export default Navbar;
