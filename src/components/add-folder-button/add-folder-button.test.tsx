import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddFolderButton from ".";

describe("AddFolderButton Component", () => {
  it("should render correctly", () => {
    render(<AddFolderButton />);

    const button = screen.getByTitle("Create new folder");
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(button.querySelector("path")).toBeInTheDocument();

    const text = screen.getByText("New Folder");
    expect(text).toBeInTheDocument();
  });

  it("should invoked passed onClick function when button clicked", async () => {
    const mockOnClick = jest.fn();

    render(<AddFolderButton onClick={mockOnClick} />);

    const button = screen.getByTitle("Create new folder");

    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
