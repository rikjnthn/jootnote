import { render, screen } from "@testing-library/react";
import SubmitButton from ".";

describe("SubmitButton Component", () => {
  it("should render correctly", () => {
    render(<SubmitButton name="Submit" title="Submit" />);

    const button = screen.getByTitle("Submit");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveTextContent("Submit");
  });
});
