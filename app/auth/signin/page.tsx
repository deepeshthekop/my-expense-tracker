"use client";

import { SignInSchema } from "@/app/validations";
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
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SignInFormData = z.infer<typeof SignInSchema>;

function UserSignInPage() {
  const [error, setError] = useState<string | null>();
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/main";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  });

  return (
    <>
      <Link href="/auth/register" className="flex justify-end text-end">
        Register
      </Link>
      <Grid className="h-full place-items-center">
        <Card className="p-5 max-w-[400px]" variant="ghost">
          <Heading className="text-center">Sign In to your account</Heading>
          <Text as="div" className="mt-3 text-center text-[var(--gray-11)]">
            Enter your details below to sign in
          </Text>
          <form
            className="mt-10 space-y-3"
            onSubmit={handleSubmit(async (data) => {
              setIsLoading(true);
              setError(null);

              const authorization = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
              });

              if (!authorization) {
                setError("An unexpected error occured.");
                setIsLoading(false);
              } else if (!authorization.ok) {
                setError("Email or Password is incorrect");
                setIsLoading(false);
              } else router.push(callbackUrl);
            })}
          >
            {error && (
              <Callout.Root color="red">
                <Callout.Text>{error}</Callout.Text>
              </Callout.Root>
            )}
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
              Sign In
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

export default UserSignInPage;
