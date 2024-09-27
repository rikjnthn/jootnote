import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PlusIcon from ".";

describe("PlusIcon Component", () => {
  it("should render correctly", () => {
    render(<PlusIcon title="Plus" />);

    const button = screen.getByTitle("Plus");
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(button.querySelector("path")).toBeInTheDocument();
  });

  it("should invoked passed onClick function", async () => {
    const mockOnClick = jest.fn();

    render(<PlusIcon onClick={mockOnClick} title="Plus" />);

    const button = screen.getByTitle("Plus");

    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
