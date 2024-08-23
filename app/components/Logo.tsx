import { PiCommandLight } from "react-icons/pi";
import { Text } from "@radix-ui/themes";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex font-mono items-center space-x-1">
      <PiCommandLight size="32" />
      <Text className="text-xl" weight="medium">
        Expense Tracker
      </Text>
    </Link>
  );
}

export default Logo;
