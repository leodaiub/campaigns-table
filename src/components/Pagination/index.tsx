import { Flex, Button, Icon, Text } from "@chakra-ui/react";
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";
import { UsePaginationInstanceProps } from "react-table";

interface IPagination
  extends UsePaginationInstanceProps<Record<string, never>> {
  pageIndex: number;
}

export default function Pagination({
  pageIndex,
  pageOptions,
  canPreviousPage,
  gotoPage,
  previousPage,
  nextPage,
  canNextPage,
  pageCount,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
IPagination | any) {
  return (
    <Flex mb={8} align={"center"} justify={"end"} mt={"40px"} gap={"5px"}>
      <Text mr={2} fontSize="sm">
        Page
        <Text ml={1} fontWeight="bold" as="span">
          {pageIndex + 1} of {pageOptions.length}
        </Text>
      </Text>
      <Button
        size={"xs"}
        onClick={() => gotoPage(0)}
        isDisabled={!canPreviousPage}
      >
        <Icon boxSize={4} as={FiChevronsLeft} />
      </Button>
      <Button
        size={"xs"}
        onClick={() => previousPage()}
        isDisabled={!canPreviousPage}
      >
        <Icon boxSize={4} as={FiChevronLeft} />
      </Button>
      <Button size={"xs"} onClick={() => nextPage()} isDisabled={!canNextPage}>
        <Icon boxSize={4} as={FiChevronRight} />
      </Button>
      <Button
        size={"xs"}
        onClick={() => gotoPage(pageCount - 1)}
        isDisabled={!canNextPage}
      >
        <Icon boxSize={4} as={FiChevronsRight} />
      </Button>
    </Flex>
  );
}
