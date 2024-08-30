import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

function Direction({ direction }: { direction?: "asc" | "desc" }) {
  return direction ? (
    direction === "asc" ? (
      <ArrowUpIcon />
    ) : (
      <ArrowDownIcon />
    )
  ) : null;
}

export default Direction;
