import { render, screen } from "@testing-library/react";
import Input from ".";

describe("Input Component", () => {
  it("should render correctly", () => {
    const { container } = render(<Input label="Email" placeholder="Email" />);

    const label = screen.getByText("Email");
    expect(label).toBeInTheDocument();

    const input = screen.getByPlaceholderText("Email");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "false");

    const errorMessage = container.querySelector(".input-error-message");
    expect(errorMessage).toBeEmptyDOMElement();
  });

  it("should update input state to error state when error occured", async () => {
    render(<Input label="Email" placeholder="Email" error="Error message" />);

    const input = screen.getByPlaceholderText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");

    const errorMessage = screen.getByText("Error message");
    expect(errorMessage).toBeInTheDocument();
  });
});
