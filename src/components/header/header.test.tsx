import { render, screen } from "@testing-library/react";

import Header from ".";

function MockNavigation() {
  return <div>Navigation</div>;
}

function MockSetting() {
  return <div>Setting</div>;
}

jest.mock("@/components/navigation", () => MockNavigation);
jest.mock("@/components/setting", () => MockSetting);

describe("Header Component", () => {
  it("should render correctly", () => {
    const { container } = render(<Header />);

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();

    const notesText = screen.getByText("Notes");
    expect(notesText).toBeInTheDocument();

    const navigation = screen.getByText("Navigation");
    expect(navigation).toBeInTheDocument();

    const setting = screen.getByText("Setting");
    expect(setting).toBeInTheDocument();
  });
});
