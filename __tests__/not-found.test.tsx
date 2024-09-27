import { render, screen } from "@testing-library/react";

import NotFound from "@/app/not-found";

describe("NotFound Component", () => {
  it("should render correctly", () => {
    render(<NotFound />);

    const img = screen.getByRole("presentation");
    expect(img).toBeInTheDocument();

    const message = screen.getByText("The requested resource is not found");
    expect(message).toBeInTheDocument();

    const link = screen.getByText("Go back to the app");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
