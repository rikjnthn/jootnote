import { render, screen } from "@testing-library/react";
import SubmitButton from ".";

describe("SubmitButton Component", () => {
  it("should render correctly when loading", () => {
    render(<SubmitButton name="Submit" title="Submit" isLoading />);

    const button = screen.getByTitle("loading");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button).toBeDisabled();

    const spinner = screen.getByTitle("Loading");
    expect(spinner).toBeInTheDocument();
  });

  it("should render correctly when not loading", () => {
    render(<SubmitButton name="Submit" title="Submit" isLoading={false} />);

    const button = screen.getByTitle("Submit");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent("Submit");
  });
});
