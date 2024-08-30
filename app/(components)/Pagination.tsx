"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

function Pagination({ page, pages }: { page: number; pages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  if (page > pages) return null;
  return (
    <Box className="space-y-3">
      <Flex
        align="center"
        justify="between"
        direction={{
          initial: "column",
          sm: "row",
        }}
        gap="3"
      >
        <Text as="p" className="text-[var(--gray-11)]">
          Showing page {page} of {pages}
        </Text>
        {pages > 1 && (
          <Flex align="center" gapX="5">
            <Button
              variant="ghost"
              size="3"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
            >
              <ArrowLeftIcon />
              Previous
            </Button>
            <Button variant="surface">{page}</Button>
            <Button
              variant="ghost"
              size="3"
              onClick={() => goToPage(page + 1)}
              disabled={page === pages}
            >
              Next
              <ArrowRightIcon />
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default Pagination;
