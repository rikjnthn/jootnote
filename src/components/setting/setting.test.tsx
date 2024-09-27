import { render, screen } from "@testing-library/react";

import Setting from ".";
import userEvent from "@testing-library/user-event";

function MockUserSetting() {
  return <div>User setting</div>;
}

jest.mock("@/components/user-setting", () => MockUserSetting);

describe("Setting Component", () => {
  it("should render correctly when not open", () => {
    const mockIisOpenSetting = false;
    const mockSetIsOpenSetting = jest.fn();

    const { container } = render(
      <Setting
        isOpenSetting={mockIisOpenSetting}
        setIsOpenSetting={mockSetIsOpenSetting}
      />,
    );

    const settingWrapper = container.querySelector("div");
    expect(settingWrapper).toBeInTheDocument();
    expect(settingWrapper?.classList.contains("-right-full")).toBeTruthy();

    const userSetting = screen.getByText("User setting");
    expect(userSetting).toBeInTheDocument();

    const settingHeader = screen.getByText("Setting");
    expect(settingHeader).toBeInTheDocument();

    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();
  });

  it("should render correctly when open and close when close button clicked", async () => {
    let mockIisOpenSetting = true;
    const mockSetIsOpenSetting = jest
      .fn()
      .mockImplementation(() => (mockIisOpenSetting = false));

    const { container, rerender } = render(
      <Setting
        isOpenSetting={mockIisOpenSetting}
        setIsOpenSetting={mockSetIsOpenSetting}
      />,
    );

    const settingWrapper = container.querySelector("div");
    expect(settingWrapper?.classList.contains("right-0")).toBeTruthy();

    const closeButton = screen.getByRole("button");

    await userEvent.click(closeButton);

    rerender(
      <Setting
        isOpenSetting={mockIisOpenSetting}
        setIsOpenSetting={mockSetIsOpenSetting}
      />,
    );

    expect(settingWrapper?.classList.contains("-right-full")).toBeTruthy();

    jest.clearAllMocks();
  });
});
