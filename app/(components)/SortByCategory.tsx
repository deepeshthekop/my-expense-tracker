"use client";

import { Category } from "@prisma/client";
import { Button, ChevronDownIcon, DropdownMenu } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

function SortByCategory() {
  const router = useRouter();

  const categories = Object.values(Category);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft">
          All <ChevronDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={() => router.push("/main/expenses")}>
          None
        </DropdownMenu.Item>
        {categories.map((category) => (
          <DropdownMenu.Item
            key={category}
            onSelect={() => router.push(`/main/expenses?category=${category}`)}
          >
            {category}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default SortByCategory;
