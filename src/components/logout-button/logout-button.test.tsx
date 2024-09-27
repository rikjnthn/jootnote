import { render, screen } from "@testing-library/react";

import LogoutButton from ".";

jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  };
});

jest.mock("@/context/pocketbase-context", () => {
  return {
    usePocketbase: jest.fn().mockReturnValue({
      pb: {
        authStore: {
          clear: jest.fn(),
        },
      },
    }),
  };
});

describe("LogoutButton Component", () => {
  it("should render correctly", () => {
    render(<LogoutButton />);

    const logoutButton = screen.getByTitle("Logout");
    expect(logoutButton).toBeInTheDocument();
  });
});
