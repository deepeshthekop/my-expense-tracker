import {
  Avatar,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import { BsPiggyBank } from "react-icons/bs";
import GlanceCard from "./GlanceCard";
import { IoMdPaper } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";

function App() {
  return (
    <Container gridArea="main" className="p-5">
      <Text className="text-5xl" weight="bold">
        Hi, User 👋
      </Text>
      <Text size="4" as="p" color="gray" className="mt-3">
        Here are your expenses at a glance.
      </Text>
      <Grid className="my-10">
        <Grid columns={{ initial: "1", lg: "3" }} gap="5">
          <GlanceCard
            title="Total Budget"
            amount={15000}
            icon={<BsPiggyBank size={32} />}
          />
          <GlanceCard
            title="Total Spend"
            amount={4830}
            icon={<IoMdPaper size={32} />}
          />
          <GlanceCard
            title="Total Remaining"
            amount={10170}
            icon={<IoWalletOutline size={32} />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
