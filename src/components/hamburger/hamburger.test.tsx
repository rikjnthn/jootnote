import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Hamburger from ".";

describe("Hamburger Component", () => {
  it("should render correctly", () => {
    render(<Hamburger />);

    const button = screen.getByTitle("Hamburger");
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("should invoked passed onClick function", async () => {
    const mockOnClick = jest.fn();

    render(<Hamburger onClick={mockOnClick} />);

    const button = screen.getByTitle("Hamburger");

    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
