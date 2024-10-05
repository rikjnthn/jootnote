import { render, screen } from "@testing-library/react";

import DeleteAccountButton from ".";

jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn(),
  };
});

jest.mock("@/context/pocketbase-context", () => {
  return {
    usePocketbase: jest.fn().mockReturnValue({
      pb: {
        authStore: {
          model: {
            id: "id",
          },
        },
        collection: jest.fn(),
      },
    }),
  };
});

describe("DeleteAccount Component", () => {
  it("should render correctly", () => {
    render(<DeleteAccountButton />);

    const button = screen.getByTitle("Delete account");
    expect(button).toBeInTheDocument();
  });
});
