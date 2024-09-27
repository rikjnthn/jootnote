import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DeleteIcon from ".";

describe("DeleteIcon Component", () => {
  it("should render correctly", () => {
    render(<DeleteIcon title="Delete" />);

    const button = screen.getByTitle("Delete");
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(button.querySelector("path")).toBeInTheDocument();
  });

  it("should invoked passed onClick function when button clicked", async () => {
    const mockOnClick = jest.fn();

    render(<DeleteIcon onClick={mockOnClick} title="Delete" />);

    const button = screen.getByTitle("Delete");

    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
