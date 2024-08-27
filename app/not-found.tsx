import { Button } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { authOptions } from "./auth";

async function NotFoundPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-[var(--accent-9)]">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[ver(--gray-11)] sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-[var(--gray-12)">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {session ? (
            <Link href="/main">
              <Button>Go back to Dashboard</Button>
            </Link>
          ) : (
            <Link href="/">
              <Button>Go back</Button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
