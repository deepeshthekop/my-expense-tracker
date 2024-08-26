import showcase from "@/public/landing_page_showcase.png";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
  Theme,
} from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { IoCalendarClearOutline, IoWalletOutline } from "react-icons/io5";
import { LuBarChart3, LuFolderSync, LuReceipt } from "react-icons/lu";
import Logo from "./(components)/Logo";
import { authOptions } from "./auth";

async function LandingPage() {
  const session = await getServerSession(authOptions);

  return (
    <Theme appearance="inherit">
      <Box className="h-screen">
        <Flex justify="between" className="p-5">
          <Logo />
          <Link href={session ? "/main" : "/auth/signin"}>
            <Button size="3" variant="soft">
              {session ? "Dashboard" : "Login"}
            </Button>
          </Link>
        </Flex>
        <Grid
          columns={{
            initial: "1",
            md: "2",
          }}
          className="p-7 lg:my-32"
          gap="5"
        >
          <Flex
            justify="center"
            gap="5"
            direction="column"
            className="h-fit"
            gridColumn="1"
          >
            <Heading className="md:text-5xl lg:text-6xl">
              Take Control of Your Expenses
            </Heading>
            <Text className="text-xl text-[var(--gray-11)]">
              Our expense tracker app makes it easy to manage your finances and
              stay on top of your spending.
            </Text>
            <Button size="4" className="md:w-fit">
              <Link href="/auth/register">Sign Up</Link>
            </Button>
          </Flex>
          <Image src={showcase} alt="hero image" className="h-fit" />
        </Grid>
        <Box className="bg-[var(--gray-2)] p-7 lg:p-20">
          <Flex direction="column" gap="3" className="text-center">
            <Text>Key Features</Text>
            <Heading className="md:text-5xl lg:text-6xl">
              Streamline Your Expenses
            </Heading>
            <Text className="text-xl text-[var(--gray-11)]">
              Our expense tracker app offers a range of features to help you
              stay on top of your finances.
            </Text>
          </Flex>
          <Grid
            columns={{
              initial: "1",
              md: "2",
              lg: "3",
            }}
            gap="7"
            className="mt-20"
          >
            <Card className="space-y-10 p-5">
              <IoWalletOutline size={46} />
              <Heading>Track Expenses</Heading>
              <Text className="text-[var(--gray-11)]">
                Easily log and categorize your expenses to get a clear picture
                of your spending.
              </Text>
            </Card>
            <Card className="space-y-10 p-5">
              <LuReceipt size={46} />
              <Heading>Manage Receipts</Heading>
              <Text className="text-[var(--gray-11)]">
                Attach receipts to your expenses and keep everything organized
                in one place.
              </Text>
            </Card>
            <Card className="space-y-10 p-5">
              <IoCalendarClearOutline size={46} />
              <Heading>Budget Tracking</Heading>
              <Text className="text-[var(--gray-11)]">
                Set budgets for different expense categories and track your
                progress.
              </Text>
            </Card>
            <Card className="space-y-10 p-5">
              <LuBarChart3 size={46} />
              <Heading>Detailed Reporting</Heading>
              <Text className="text-[var(--gray-11)]">
                Generate detailed reports to analyze your spending and identify
                areas for improvement.
              </Text>
            </Card>
            <Card className="space-y-10 p-5">
              <LuFolderSync size={46} />
              <Heading>Sync Across Devices</Heading>
              <Text className="text-[var(--gray-11)]">
                Access your expense data from anywhere with our cross-platform
                app.
              </Text>
            </Card>
          </Grid>
        </Box>
        <Box className="p-7 lg:px-20 lg:py-32">
          <Flex
            align={{
              md: "start",
              lg: "center",
            }}
            justify="between"
            direction={{
              initial: "column",
              lg: "row",
            }}
            gap="5"
          >
            <Flex direction="column" gap="3">
              <Heading className="text-3xl lg:text-5xl">
                Take Control of Your Finances
              </Heading>
              <Text className="text-lg lg:text-2xl text-[var(--gray-11)]">
                Sign up for our expense tracker and start managing your expenses
                with ease.
              </Text>
            </Flex>
            <Button size="4" className="text-nowrap">
              <Link href="/auth/register">Sign Up</Link>
            </Button>
          </Flex>
        </Box>
        <Flex justify="center" className="p-5 bg-[var(--gray-2)]">
          <Text>© 2024 Expense Tracker. All rights reserved.</Text>
        </Flex>
      </Box>
    </Theme>
  );
}

export default LandingPage;
