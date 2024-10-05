import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BackIcon from ".";

describe("BackIcon Component", () => {
  it("should render correctly", () => {
    render(<BackIcon />);

    const button = screen.getByTitle("Back");
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(button.querySelector("path")).toBeInTheDocument();
  });

  it("should invoked passed onClick function when button clicked", async () => {
    const mockOnClick = jest.fn();

    render(<BackIcon onClick={mockOnClick} />);

    const button = screen.getByTitle("Back");

    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
