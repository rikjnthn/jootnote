import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EditIcon from ".";

describe("EditIcon Component", () => {
  it("should render correctly", () => {
    render(<EditIcon />);

    const button = screen.getByTitle("Edit");
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(button.querySelector("path")).toBeInTheDocument();
  });

  it("should invoked passed onClick function when button clicked", async () => {
    const mockOnClick = jest.fn();

    render(<EditIcon onClick={mockOnClick} />);

    const button = screen.getByTitle("Edit");

    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
