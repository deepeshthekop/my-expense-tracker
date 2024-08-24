import { Box, Flex, Text } from "@radix-ui/themes";
import Logo from "../(components)/Logo";
import { Suspense } from "react";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className="h-screen">
      <Flex>
        <Flex
          direction="column"
          className="hidden md:flex bg-[var(--gray-2)] w-1/2 p-10 h-screen border-r border-[var(--gray-4)]"
        >
          <Logo />
          <Box className="relative mt-auto space-y-2">
            <Text className="text-xl">
              &ldquo;Where attention goes, energy flows, and growth follows.
              Every choice is a step, every step a journey. The path to
              abundance is paved with mindful footsteps.&rdquo;
            </Text>
            <Text as="div">— Alex Carrington</Text>
          </Box>
        </Flex>
        <Box className="w-full md:w-1/2 p-10 h-screen">
          <Suspense>{children}</Suspense>
        </Box>
      </Flex>
    </Box>
  );
}

export default AuthLayout;
