import { render, screen } from "@testing-library/react";

import SettingButton from ".";
import userEvent from "@testing-library/user-event";

describe("SettingButton Component", () => {
  it("should render correctly", () => {
    render(<SettingButton />);

    const button = screen.getByTitle("Setting");
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();

    const text = screen.getByText("Setting");
    expect(text).toBeInTheDocument();
  });

  it("should invoked onClick function when clicked", async () => {
    const mockOnClick = jest.fn();

    render(<SettingButton onClick={mockOnClick} />);

    const button = screen.getByTitle("Setting");

    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
