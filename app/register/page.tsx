"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import Logo from "../components/Logo";
import { RegistrationSchema } from "../api/users/route";

type RegistrationFormData = z.infer<typeof RegistrationSchema>;

function UserRegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(RegistrationSchema),
  });

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
              <form
                className="mt-10 space-y-3"
                onSubmit={handleSubmit((data) => console.log(data))}
              >
                <Box>
                  {errors.name && (
                    <Text color="red" className="text-sm">
                      {errors.name.message}
                    </Text>
                  )}
                  <TextField.Root
                    {...register("name")}
                    placeholder="Name"
                  ></TextField.Root>
                </Box>
                <Box>
                  {errors.email && (
                    <Text color="red" className="text-sm">
                      {errors.email.message}
                    </Text>
                  )}
                  <TextField.Root
                    {...register("email")}
                    placeholder="Email"
                  ></TextField.Root>
                </Box>
                <Box>
                  {errors.password && (
                    <Text color="red" className="text-sm">
                      {errors.password.message}
                    </Text>
                  )}
                  <TextField.Root
                    {...register("password")}
                    placeholder="Password"
                    type="password"
                  ></TextField.Root>
                </Box>
                <Button className="w-full">Sign Up</Button>
              </form>
              <Text
                as="div"
                className="mt-10 text-xs text-center text-[var(--gray-11)]"
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
