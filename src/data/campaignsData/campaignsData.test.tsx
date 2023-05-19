import { render, screen } from "@testing-library/react";
import { filterInDateRange, columns, getIsActive } from ".";

jest.mock("./", () => {
  const originalModule = jest.requireActual("./");

  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    getIsActive: jest.fn(),
  };
});

describe("campaignsData", () => {
  beforeEach(() => {
    (getIsActive as jest.Mock).mockReturnValue(null);
  });

  test("should filter rows within the date range", () => {
    const rows = [
      { values: { id: 1, startDate: "2022-01-01", endDate: "2022-01-31" } },
      { values: { id: 2, startDate: "2022-02-01", endDate: "2022-02-28" } },
      { values: { id: 3, startDate: "2022-03-01", endDate: "2022-03-31" } },
    ];

    const id = "startDate";
    const filterValue = ["2022-02-01", "2022-03-01"];

    const filteredRows = filterInDateRange(rows, id, filterValue);

    expect(filteredRows).toHaveLength(2);
    expect(filteredRows[0].values.id).toBe(2);
    expect(filteredRows[1].values.id).toBe(3);
  });

  test("should not filter rows outside the date range", () => {
    const rows = [
      { values: { id: 1, startDate: "2022-01-01", endDate: "2022-01-31" } },
      { values: { id: 2, startDate: "2022-02-01", endDate: "2022-02-28" } },
      { values: { id: 3, startDate: "2022-03-01", endDate: "2022-03-31" } },
    ];

    const id = "startDate";
    const filterValue = ["2022-04-01", "2022-05-01"];

    const filteredRows = filterInDateRange(rows, id, filterValue);

    expect(filteredRows).toHaveLength(0);
  });

  test("should have the expected properties", () => {
    columns.forEach((column) => {
      expect(column).toHaveProperty("Header");
      expect(column).toHaveProperty("accessor");
      expect(column).toHaveProperty("Filter");
      expect(column).toHaveProperty("filter");
    });
  });

  test("renders 'Inactive' badge when campaign is inactive", () => {
    (getIsActive as jest.Mock).mockReturnValue(false);

    const original = {
      startDate: "2023-01-01",
      endDate: "2023-01-31",
    };
    render(columns[4].Cell({ row: { original } }));

    const inactiveBadge = screen.getByText("Inactive");
    expect(inactiveBadge).toBeInTheDocument();
  });
});
