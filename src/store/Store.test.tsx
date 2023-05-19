import { act, renderHook } from "@testing-library/react";
import { useStore } from ".";
import { ICampaign } from "../types";

describe("useStore", () => {
  beforeEach(() => {
    useStore.setState({
      tableData: [],
      search: "",
      dateRange: [undefined, undefined],
    });
  });

  test("should update search", () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.updateSearch("your-search-value");
    });

    expect(result.current.search).toBe("your-search-value");
  });

  test("should update date range", () => {
    const { result } = renderHook(() => useStore());

    const dateRange: [Date, Date] = [
      new Date("2022-01-01"),
      new Date("2022-12-31"),
    ];

    act(() => {
      result.current.updateDateRange(dateRange);
    });

    expect(result.current.dateRange).toEqual(dateRange);
  });

  test("should update table data", () => {
    const { result } = renderHook(() => useStore());

    const tableData: ICampaign[] = [
      {
        id: 1,
        name: "Campaign 1",
        startDate: "2022-01-01",
        endDate: "2022-01-31",
        Budget: 1000,
      },
    ];

    act(() => {
      result.current.updateTableData(tableData);
    });

    expect(result.current.tableData).toEqual(tableData);
  });
});
