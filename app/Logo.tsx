import { GrGraphQl } from "react-icons/gr";
import { Text } from "@radix-ui/themes";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <GrGraphQl size="24" />
      <Text className="text-xl" weight="medium">
        Expense Tracker
      </Text>
    </Link>
  );
}

export default Logo;
