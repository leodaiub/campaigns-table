/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./";

describe("Pagination", () => {
  test("renders page information correctly", () => {
    const pageIndex = 0;
    const pageOptions = [1, 2, 3];
    render(
      <Pagination
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        canPreviousPage={true}
        gotoPage={() => {}}
        previousPage={() => {}}
        nextPage={() => {}}
        canNextPage={true}
        pageCount={3}
      />
    );

    const pageInfo = screen.getByText("Page 1 of 3");
    expect(pageInfo).toBeInTheDocument();
  });

  test("calls gotoPage with the correct page number", () => {
    const pageIndex = 0;
    const gotoPageMock = jest.fn();
    render(
      <Pagination
        pageIndex={pageIndex}
        pageOptions={[1, 2, 3]}
        canPreviousPage={true}
        gotoPage={gotoPageMock}
        previousPage={() => {}}
        nextPage={() => {}}
        canNextPage={true}
        pageCount={3}
      />
    );

    const firstPageButton = screen.getByRole("firstPage");
    fireEvent.click(firstPageButton);

    expect(gotoPageMock).toHaveBeenCalledWith(0);
  });

  test("disables previous button when canPreviousPage is false", () => {
    render(
      <Pagination
        pageIndex={0}
        pageOptions={[1, 2, 3]}
        canPreviousPage={false}
        gotoPage={() => {}}
        previousPage={() => {}}
        nextPage={() => {}}
        canNextPage={true}
        pageCount={3}
      />
    );

    const previousButton = screen.getByRole("previousPage");
    expect(previousButton).toBeDisabled();
  });

  test("disables next button when canNextPage is false", () => {
    render(
      <Pagination
        pageIndex={2}
        pageOptions={[1, 2, 3]}
        canPreviousPage={true}
        gotoPage={() => {}}
        previousPage={() => {}}
        nextPage={() => {}}
        canNextPage={false}
        pageCount={3}
      />
    );

    const nextButton = screen.getByRole("nextPage");
    expect(nextButton).toBeDisabled();
  });

  test("calls nextPage when next button is clicked", () => {
    const nextPageMock = jest.fn();
    render(
      <Pagination
        pageIndex={0}
        pageOptions={[1, 2, 3]}
        canPreviousPage={true}
        gotoPage={() => {}}
        previousPage={() => {}}
        nextPage={nextPageMock}
        canNextPage={true}
        pageCount={3}
      />
    );

    const nextButton = screen.getByRole("nextPage");
    fireEvent.click(nextButton);

    expect(nextPageMock).toHaveBeenCalledTimes(1);
  });

  test("calls previousPage when previous button is clicked", () => {
    const previousPageMock = jest.fn();
    render(
      <Pagination
        pageIndex={1}
        pageOptions={[1, 2, 3]}
        canPreviousPage={true}
        gotoPage={() => {}}
        previousPage={previousPageMock}
        nextPage={() => {}}
        canNextPage={true}
        pageCount={3}
      />
    );

    const previousButton = screen.getByRole("previousPage");
    fireEvent.click(previousButton);

    expect(previousPageMock).toHaveBeenCalledTimes(1);
  });

  test("calls lastPage with the correct page number", () => {
    const pageIndex = 0;
    const gotoPageMock = jest.fn();
    render(
      <Pagination
        pageIndex={pageIndex}
        pageOptions={[1, 2, 3]}
        canPreviousPage={true}
        gotoPage={gotoPageMock}
        previousPage={() => {}}
        nextPage={() => {}}
        canNextPage={true}
        pageCount={3}
      />
    );

    const lastPageButton = screen.getByRole("lastPage");
    fireEvent.click(lastPageButton);

    expect(gotoPageMock).toHaveBeenCalledWith(2);
  });
});
