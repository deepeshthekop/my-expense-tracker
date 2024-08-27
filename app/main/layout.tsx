import { Grid, Box } from "@radix-ui/themes";
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Provider from "./Provider";
import { Toaster } from "react-hot-toast";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Grid
      areas={{
        initial: '"main"',
        lg: '"aside main"',
      }}
      columns={{
        initial: "1fr",
        lg: "280px 1fr",
      }}
    >
      <Sidebar />
      <Box gridArea="main">
        <Provider>
          <Navbar />
        </Provider>
        <Toaster
          toastOptions={{
            className:
              "border border-[var(--gray-5)] bg-[var(--gray-2)] text-[var(--gray-12)]",
          }}
        />
        {children}
      </Box>
    </Grid>
  );
}
