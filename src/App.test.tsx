import { render, screen, fireEvent } from "@testing-library/react";
import { convertHexToRGBA } from "src/utils";
import App from "./App";

describe("App", () => {
  test("renders the main button to track a new address", () => {
    render(<App />);
    const trackNewAddressButton = screen.getByText(/track new address/i);
    expect(trackNewAddressButton).toBeInTheDocument();
  });
});

describe("theme", () => {
  it("displays the right styles for the initial theme", () => {
    render(<App />);
    const trackNewAddressButton = screen.getByText(/track new address/i);
    expect(trackNewAddressButton).toHaveStyle({
      backgroundColor: convertHexToRGBA("#00dbde")
    });
  });

  it("changes the styles properly when flipping the theme switch", () => {
    render(<App />);
    const toggleThemeButton = screen.getAllByRole("button")[0];
    fireEvent.click(toggleThemeButton);
    const trackNewAddressButton = screen.getByText(/track new address/i);

    expect(trackNewAddressButton).toHaveStyle({
      backgroundColor:
        "linear-gradient(90deg,rgba(129,230,217,1) 0%,rgba(79,209,197,1) 100%)"
    });
  });
});
