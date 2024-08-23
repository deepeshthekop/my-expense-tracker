import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import Link from "next/link";
import Logo from "../components/Logo";

function UserRegistrationPage() {
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
              abundance is paved with mindful footsteps&rdquo;
            </Text>
            <Text as="div">— Alex Carrington</Text>
          </Box>
        </Flex>
        <Box className="w-full md:w-1/2 p-10 h-screen">
          <Link href="/login" className="flex justify-end text-end">
            Login
          </Link>
          <Grid className="h-full place-items-center">
            <Card className="p-5 max-w-[400px]" variant="ghost">
              <Heading className="text-center">Create an account</Heading>
              <Text as="div" className="mt-3 text-center text-[var(--gray-11)]">
                Enter your details below to create your account
              </Text>
              <form className="mt-10 space-y-3">
                <TextField.Root placeholder="Your Name"></TextField.Root>
                <TextField.Root placeholder="Email"></TextField.Root>
                <TextField.Root
                  placeholder="Password"
                  type="password"
                ></TextField.Root>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </form>
              <Text
                as="div"
                className="mt-10 text-sm text-center text-[var(--gray-11)]"
              >
                By clicking continue, you agree to our{" "}
                <Text className="underline underline-offset-4">
                  Terms of Service
                </Text>{" "}
                and{" "}
                <Text className="underline underline-offset-4">
                  Privacy Policy
                </Text>
                .
              </Text>
            </Card>
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
}

export default UserRegistrationPage;
