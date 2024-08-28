"use client";

import { Button } from "@radix-ui/themes";
import { signOut } from "next-auth/react";

function SignOutButton() {
  return (
    <Button
      className="w-full"
      color="red"
      variant="soft"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: "/auth/signin",
        })
      }
    >
      Sign Out
    </Button>
  );
}

export default SignOutButton;
