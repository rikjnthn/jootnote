import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ArrowIcon from ".";

describe("ArrowIcon Component", () => {
  it("should render correctly when open", () => {
    render(<ArrowIcon isOpen />);

    const button = screen.getByTitle("Open folder");
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(button.querySelector("path")).toBeInTheDocument();
    expect(
      button.querySelector("svg")?.classList.contains("rotate-90"),
    ).toBeTruthy();
  });

  it("should render correctly when is not open", () => {
    render(<ArrowIcon isOpen={false} />);

    const button = screen.getByTitle("Open folder");
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(button.querySelector("path")).toBeInTheDocument();
    expect(
      button.querySelector("svg")?.classList.contains("rotate-90"),
    ).toBeFalsy();
  });

  it("should invoked passed onClick function when button clicked", async () => {
    const mockOnClick = jest.fn();

    render(<ArrowIcon isOpen onClick={mockOnClick} />);

    const button = screen.getByTitle("Open folder");

    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
