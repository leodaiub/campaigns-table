import { render, screen } from "@testing-library/react";
import DateRangePicker from "./";

test("renders date range picker with placeholder text", () => {
  render(<DateRangePicker />);

  const placeholderText = "Select date range...";
  const inputElement = screen.getByPlaceholderText(placeholderText);

  expect(inputElement).toBeInTheDocument();
});
