import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SaveContentButton from ".";

describe("SaveContentButton Component", () => {
  it("should render correctly", () => {
    render(<SaveContentButton />);

    const button = screen.getByText("Save");
    expect(button).toBeInTheDocument();
  });

  it("should invoked onClick function when button clicked", async () => {
    const mockOnClick = jest.fn();

    render(<SaveContentButton onClick={mockOnClick} />);

    const button = screen.getByText("Save");

    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
