"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Callout,
  Card,
  Grid,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegistrationSchema } from "@/app/validations";
import { useRouter } from "next/navigation";

type RegistrationFormData = z.infer<typeof RegistrationSchema>;

function UserRegistrationPage() {
  const [error, setError] = useState<string | null>();
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(RegistrationSchema),
  });

  return (
    <>
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
            onSubmit={handleSubmit((data) => {
              setIsLoading(true);
              setError(null);
              axios
                .post("/api/users", data)
                .then(() => router.push("/auth/login"))
                .catch((error: AxiosError) => {
                  if (error.response?.status === 409)
                    setError("User already exist");
                  else setError(error.message);
                })
                .finally(() => setIsLoading(false));
            })}
          >
            {error && (
              <Callout.Root color="red">
                <Callout.Text>{error}</Callout.Text>
              </Callout.Root>
            )}
            <Box>
              {errors.name && (
                <Text color="red" className="text-sm">
                  {errors.name.message}
                </Text>
              )}
              <TextField.Root
                {...register("name")}
                placeholder="Name"
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
              ></TextField.Root>
            </Box>
            <Button className="w-full" loading={loading}>
              Sign Up
            </Button>
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
            <Text className="underline underline-offset-4">Privacy Policy</Text>
            .
          </Text>
        </Card>
      </Grid>
    </>
  );
}

export default UserRegistrationPage;
