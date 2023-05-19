import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "./";

describe("SearchInput", () => {
  test("renders search input field", () => {
    render(<SearchInput />);
    const searchInput = screen.getByPlaceholderText(
      "Search..."
    ) as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
  });

  test("updates search value on input change", () => {
    render(<SearchInput />);
    const searchInput = screen.getByPlaceholderText(
      "Search..."
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "example" } });
    expect(searchInput.value).toBe("example");
  });

  test("clears search value on close icon click", () => {
    render(<SearchInput />);
    const searchInput = screen.getByPlaceholderText(
      "Search..."
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "example" } });
    const closeIcon = screen.getByRole("clearSearch");
    fireEvent.click(closeIcon);
    expect(searchInput.value).toBe("");
  });
});
