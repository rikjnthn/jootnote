import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Setting from ".";
import { useNavigation } from "@/context/navigation-context";

function MockUserSetting() {
  return <div>User setting</div>;
}

jest.mock("@/components/user-setting", () => MockUserSetting);
jest.mock("@/context/navigation-context", () => {
  return {
    useNavigation: jest.fn().mockReturnValue({
      isOpenSetting: false,
    }),
    useNavigationDispatch: jest.fn().mockReturnValue({
      setIsOpenSetting: jest.fn(),
    }),
  };
});

describe("Setting Component", () => {
  it("should render correctly when not open", () => {
    const { container } = render(<Setting />);

    const settingWrapper = container.querySelector("div");
    expect(settingWrapper).toBeInTheDocument();
    expect(settingWrapper?.classList.contains("-right-full")).toBeTruthy();

    const userSetting = screen.getByText("User setting");
    expect(userSetting).toBeInTheDocument();

    const settingHeader = screen.getByText("Setting");
    expect(settingHeader).toBeInTheDocument();

    const closeButton = screen.getByTitle("Back");
    expect(closeButton).toBeInTheDocument();
  });

  it("should render correctly when open and close when close button clicked", async () => {
    (useNavigation as jest.Mock).mockReturnValue({
      isOpenSetting: true,
    });

    const { container, rerender } = render(<Setting />);

    const settingWrapper = container.querySelector("div");
    expect(settingWrapper?.classList.contains("right-0")).toBeTruthy();

    const closeButton = screen.getByTitle("Back");

    await userEvent.click(closeButton);

    (useNavigation as jest.Mock).mockReturnValue({
      isOpenSetting: false,
    });
    rerender(<Setting />);

    expect(settingWrapper?.classList.contains("-right-full")).toBeTruthy();

    jest.clearAllMocks();
  });
});
