import { render, screen } from "@testing-library/react";

import Loading from "@/app/(app)/note/[fileId]/loading";

describe("ContentLoading Component", () => {
  it("should render correctly", () => {
    render(<Loading />);

    const loader = screen.getByTitle("Loading");
    expect(loader).toBeInTheDocument();
    expect(loader.querySelector("svg")).toHaveAttribute("class", "spin");
  });
});
