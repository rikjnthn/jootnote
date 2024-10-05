import { render, screen } from "@testing-library/react";

import Error from "@/app/error";

describe("Error Page Component", () => {
  it("should render correctly", () => {
    render(<Error />);

    const img = screen.getByRole("presentation");
    expect(img).toBeInTheDocument();

    const message = screen.getByText("An error has occured");
    expect(message).toBeInTheDocument();
  });
});
