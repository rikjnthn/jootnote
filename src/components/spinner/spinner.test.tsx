import { render, screen } from "@testing-library/react";

import Loading from ".";

describe("ContentLoading Component", () => {
  it("should render correctly", () => {
    render(<Loading />);

    const loader = screen.getByTitle("Spinner");
    expect(loader.querySelector("svg")).toHaveAttribute("class", "spin");
  });
});
