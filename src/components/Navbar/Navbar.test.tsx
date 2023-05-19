/* eslint-disable @typescript-eslint/no-var-requires */
import { fireEvent, render, screen } from "@testing-library/react";
import Nav from "./";

// Mock the useColorMode hook
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useColorMode: jest.fn().mockReturnValue({
    colorMode: "light",
    toggleColorMode: jest.fn(),
  }),
}));

describe("Nav", () => {
  test("renders the MoonIcon when colorMode is 'light'", () => {
    render(<Nav />);
    const moonIcon = screen.getByRole("moon");
    expect(moonIcon).toBeInTheDocument();
  });

  test("renders the SunIcon when colorMode is not 'light'", () => {
    // Mock the useColorMode hook to return a different colorMode value
    jest.spyOn(require("@chakra-ui/react"), "useColorMode").mockReturnValue({
      colorMode: "dark",
      toggleColorMode: jest.fn(),
    });

    render(<Nav />);
    const sunIcon = screen.getByRole("sun");
    expect(sunIcon).toBeInTheDocument();
  });

  test("calls toggleColorMode when the color mode button is clicked", () => {
    // Mock the toggleColorMode function
    const toggleColorModeMock = jest.fn();

    // Mock the useColorMode hook to return the mock function
    jest.spyOn(require("@chakra-ui/react"), "useColorMode").mockReturnValue({
      colorMode: "light",
      toggleColorMode: toggleColorModeMock,
    });

    render(<Nav />);
    const colorModeButton = screen.getByRole("colorMode");

    fireEvent.click(colorModeButton);

    expect(toggleColorModeMock).toHaveBeenCalledTimes(1);
  });

  test("renders Nav component", () => {
    render(<Nav />);
    const navElement = screen.getByRole("nav");
    expect(navElement).toBeInTheDocument();
  });

  test("dark mode toggle switches color mode", () => {
    render(<Nav />);

    // Find the dark mode toggle button
    const toggleButton = screen.getByRole("colorMode");
    const moonButton = screen.getByRole("colorMode");
    const sunButton = screen.getByRole("colorMode");

    // Check initial color mode
    expect(moonButton).toBeInTheDocument(); // Assuming 'light' is the initial color mode

    // Click the toggle button to switch to dark mode
    fireEvent.click(toggleButton);

    // Check if color mode is switched to dark
    expect(sunButton).toBeInTheDocument();

    // Click the toggle button again to switch back to light mode
    fireEvent.click(toggleButton);

    // Check if color mode is switched back to light
    expect(moonButton).toBeInTheDocument();
  });
});
