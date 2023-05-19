import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import {
  Column,
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import Pagination from "../Pagination";
import { useEffect } from "react";
import { isAfter } from "date-fns";
import { ICampaign } from "../../types";

declare global {
  interface Window {
    AddCampaigns: unknown;
  }
}

export default function AppTable({ columns }: { columns: Column<object>[] }) {
  const [tableData, updateTableData, dateRange, search] = useStore(
    (state) => [
      state.tableData,
      state.updateTableData,
      state.dateRange,
      state.search,
    ],
    shallow
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    canPreviousPage,
    canNextPage,
    page,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
    setGlobalFilter,
    setFilter,
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  window.AddCampaigns = function (campaigns: ICampaign[]) {
    updateTableData(
      campaigns.filter((data) =>
        isAfter(new Date(data.endDate), new Date(data.startDate))
      )
    );
  };

  const onSearchInputChange = useAsyncDebounce((value?: string) => {
    setGlobalFilter(value || undefined);
  }, 200);

  useEffect(() => {
    onSearchInputChange(search);
  }, [onSearchInputChange, search]);

  useEffect(() => {
    setFilter("startDate", dateRange);
    setFilter("endDate", dateRange);
  }, [dateRange, setFilter]);

  return (
    <TableContainer>
      <Table variant={"simple"} size="md" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <Flex align={"center"} gap={"10px"}>
                    <Box as="span"> {column.render("Header")} </Box>
                    {column.isSorted && (
                      <Box as="span">
                        {column.isSortedDesc ? (
                          <ArrowDownIcon boxSize={3} ml={2} />
                        ) : (
                          <ArrowUpIcon boxSize={3} ml={2} />
                        )}
                      </Box>
                    )}
                    <Box ml={2} as="span">
                      {column?.canFilter ? column.render("Filter") : null}
                    </Box>
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Pagination
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        canPreviousPage={canPreviousPage}
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        page={undefined}
        setPageSize={undefined}
      />
    </TableContainer>
  );
}
