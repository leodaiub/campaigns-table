/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { Badge } from "@chakra-ui/react";
import { isAfter, isBefore } from "date-fns";
import { ICampaign } from "../../types";

export const campaignsList: ICampaign[] = [
  {
    id: 1,
    name: "Divavu",
    startDate: "5/21/2023",
    endDate: "5/17/2023",
    Budget: 88377,
  },
  {
    id: 2,
    name: "Jaxspan",
    startDate: "11/21/2017",
    endDate: "2/21/2018",
    Budget: 608715,
  },
  {
    id: 3,
    name: "Miboo",
    startDate: "11/1/2017",
    endDate: "6/20/2017",
    Budget: 239507,
  },
  {
    id: 4,
    name: "Trilith",
    startDate: "8/25/2017",
    endDate: "11/30/2017",
    Budget: 179838,
  },
  {
    id: 5,
    name: "Layo",
    startDate: "11/28/2017",
    endDate: "3/10/2018",
    Budget: 837850,
  },
  {
    id: 6,
    name: "Photojam",
    startDate: "7/25/2017",
    endDate: "6/23/2017",
    Budget: 858131,
  },
  {
    id: 7,
    name: "Blogtag",
    startDate: "6/27/2017",
    endDate: "1/15/2018",
    Budget: 109078,
  },
  {
    id: 8,
    name: "Rhyzio",
    startDate: "10/13/2017",
    endDate: "1/25/2018",
    Budget: 272552,
  },
  {
    id: 9,
    name: "Zoomcast",
    startDate: "9/6/2017",
    endDate: "11/10/2017",
    Budget: 301919,
  },
  {
    id: 10,
    name: "Realbridge",
    startDate: "3/5/2018",
    endDate: "10/2/2017",
    Budget: 505602,
  },
];

export const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function filterInDateRange(rows: any, id: any, filterValue: any[]) {
  return rows.filter((row: any) => {
    const rowValue = row.values[id];
    return (
      !isAfter(new Date(filterValue[0]), new Date(rowValue)) &&
      !isBefore(new Date(filterValue[1]), new Date(rowValue))
    );
  });
}

export const getIsActive = (startDate: Date, endDate: Date) =>
  !isBefore(new Date(), new Date(startDate)) &&
  !isAfter(new Date(), new Date(endDate));

export const columns: any[] = [
  {
    Header: "ID",
    accessor: "id",
    Filter: "",
    filter: "",
  },
  {
    Header: "Name",
    accessor: "name",
    Filter: "",
    filter: "",
  },
  {
    Header: "Start Date",
    accessor: "startDate",
    Filter: "",
    filter: filterInDateRange as any,
  },
  {
    Header: "End Date",
    accessor: "endDate",
    Filter: "",
    filter: filterInDateRange as any,
  },
  {
    Header: "Active",
    accessor: "active",
    Filter: "",
    filter: "",
    Cell: ({ row: { original } }: any) => {
      const isActive = getIsActive(original.startDate, original.endDate);
      return (
        <Badge colorScheme={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    Header: "Budget",
    accessor: "Budget",
    Filter: "",
    filter: "",
    Cell: ({ row: { original } }: any) => (
      <>{USDollar.format(original.Budget)}</>
    ),
  },
];
