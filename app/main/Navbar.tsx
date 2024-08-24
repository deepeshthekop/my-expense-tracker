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
import Logo from "@/app/(components)/Logo";
import { signIn, signOut, useSession } from "next-auth/react";

const navItems = [
  { label: "Dashboard", icon: <FiHome size={22} />, link: "/main" },
  {
    label: "Expenses",
    icon: <TbCashRegister size={22} />,
    link: "/main/expenses",
  },
  { label: "Budgets", icon: <FiPieChart size={22} />, link: "/main/budgets" },
];

function Navbar() {
  const currentPath = usePathname();
  const session = useSession();

  if (session.status === "unauthenticated") signIn();

  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <Box
      gridArea="nav"
      className="h-[65px] border-b bg-[var(--gray-2)] border-[var(--gray-5)] sticky top-0 z-20"
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

        <Flex gapX="2">
          <Button
            variant="outline"
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: "/auth/signin",
              })
            }
          >
            {session.data?.user?.name}
          </Button>
          <Button
            variant="soft"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
