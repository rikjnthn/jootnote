import { render, screen } from "@testing-library/react";

import Logo from ".";

describe("Logo Component", () => {
  it("should render correctly", () => {
    render(<Logo />);

    const logoWrapper = screen.getByTitle("JootNote");
    expect(logoWrapper).toBeInTheDocument();
    logoWrapper.querySelectorAll("svg").forEach((svg) => {
      expect(svg).toBeInTheDocument();
    });
  });
});
