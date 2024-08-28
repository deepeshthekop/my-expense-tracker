"use client";

import Logo from "@/app/(components)/Logo";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiHome, FiPieChart } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import { TbCashRegister } from "react-icons/tb";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

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
  const { data: session } = useSession();
  const router = useRouter();

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

        <Flex gapX="5" align="center">
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2"
          >
            {theme === "dark" ? (
              <SunIcon className="size-5" />
            ) : (
              <MoonIcon className="size-5" />
            )}
          </Button>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={session?.user?.image || ""}
                fallback="?"
                radius="full"
                className="cursor-pointer"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              variant="soft"
              className="min-w-fit w-[220px]"
            >
              <Flex direction="column" className="px-2 py-1">
                <Text className="text-sm" weight="bold">
                  {session?.user?.name}
                </Text>
                <Text className="text-xs text-[var(--gray-11)]">
                  {session?.user?.email}
                </Text>
              </Flex>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onSelect={() => router.push("/main/account")}>
                Account
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={() =>
                  signOut({
                    redirect: true,
                    callbackUrl: "/auth/signin",
                  })
                }
              >
                Sign Out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
