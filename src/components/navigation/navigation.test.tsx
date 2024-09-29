import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Navigation from ".";
import { useNavigation } from "@/context/navigation-context";

function MockLogo() {
  return <div>Logo</div>;
}

function MockAddFolderButton() {
  return <div>Add folder button</div>;
}

function MockFolderList() {
  return <div>Folder list</div>;
}

function MockFolderProvider({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

jest.mock("@/components/logo", () => MockLogo);
jest.mock("@/components/add-folder-button", () => MockAddFolderButton);
jest.mock("@/components/folder-list", () => MockFolderList);
jest.mock("@/context/folder-context", () => {
  return {
    FolderProvider: MockFolderProvider,
  };
});

jest.mock("@/context/navigation-context", () => {
  return {
    useNavigation: jest.fn().mockReturnValue({
      isOpenNav: false,
    }),
    useNavigationDispatch: jest.fn().mockReturnValue({
      setIsOpenNav: jest.fn(),
      setIsOpenSetting: jest.fn(),
    }),
  };
});

describe("Navigation Component", () => {
  it("should render correctly", () => {
    const { container } = render(<Navigation />);

    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();

    const closeButton = screen.getByTitle("Close");
    expect(closeButton).toBeInTheDocument();

    const logo = screen.getByText("Logo");
    expect(logo).toBeInTheDocument();

    const folderList = screen.getByText("Folder list");
    expect(folderList).toBeInTheDocument();

    const addFolderbutton = screen.getByText("Add folder button");
    expect(addFolderbutton).toBeInTheDocument();

    const settingButton = screen.getByTitle("Setting");
    expect(settingButton).toBeInTheDocument();
  });

  it("should hidden overlay and close nav when closed", () => {
    const { container } = render(<Navigation />);

    const nav = container.querySelector("nav");
    expect(nav?.classList.contains("max-md:-left-full")).toBeTruthy();

    const darkOverlay = container.querySelector(".dark_overlay");
    expect(darkOverlay?.classList.contains("hidden")).toBeTruthy();
  });

  it("should display overlay and open nav when open", () => {
    (useNavigation as jest.Mock).mockReturnValue({
      isOpenNav: true,
    });
    const { container } = render(<Navigation />);

    const nav = container.querySelector("nav");
    expect(nav?.classList.contains("left-0")).toBeTruthy();

    const darkOverlay = container.querySelector(".dark_overlay");
    expect(darkOverlay?.classList.contains("hidden")).toBeFalsy();
  });

  it("should close nav if close button is clicked", async () => {
    (useNavigation as jest.Mock).mockReturnValue({
      isOpenNav: true,
    });
    const { container } = render(<Navigation />);

    const nav = container.querySelector("nav");
    expect(nav?.classList.contains("max-md:-left-full")).toBeFalsy();

    const closeButton = screen.getByTitle("Close");

    await userEvent.click(closeButton);

    (useNavigation as jest.Mock).mockReturnValue({
      isOpenNav: true,
    });

    const darkOverlay = container.querySelector(".dark_overlay");
    expect(darkOverlay?.classList.contains("hidden")).toBeFalsy();
  });

  it("should close nav if setting button is clicked", async () => {
    const { container } = render(<Navigation />);

    const nav = container.querySelector("nav");
    expect(nav?.classList.contains("max-md:-left-full")).toBeFalsy();

    const closeButton = screen.getByTitle("Setting");

    await userEvent.click(closeButton);

    const darkOverlay = container.querySelector(".dark_overlay");
    expect(darkOverlay?.classList.contains("hidden")).toBeFalsy();
  });
});
