import { render, screen } from "@testing-library/react";

import VerifyEmailInformation from ".";
import userEvent from "@testing-library/user-event";

function MockButtonWithTimer() {
  return <div>Button with timer</div>;
}

jest.mock("@/components/button-with-timer", () => MockButtonWithTimer);

jest.mock("@/context/pocketbase-context", () => {
  return {
    usePocketbase: jest.fn().mockReturnValue({
      pb: {
        collection: jest.fn(),
      },
    }),
  };
});

describe("VerifyEmailInformation Component", () => {
  it("should render correctly", () => {
    const mockSetIsVerifying = jest.fn();

    render(
      <VerifyEmailInformation
        email="email@example.com"
        setIsVerifying={mockSetIsVerifying}
      />,
    );

    const heading = screen.getByText("Verify Your Account");
    expect(heading).toBeInTheDocument();

    const text = screen.getByText(/We have send you a verification email/);
    expect(text).toBeInTheDocument();

    const backButton = screen.getByText("Back");
    expect(backButton).toBeInTheDocument();

    const buttonWithTimer = screen.getByText("Button with timer");
    expect(buttonWithTimer).toBeInTheDocument();
  });

  it("should invoked setIsVerifying with 'false' as argument when user click back button", async () => {
    const mockSetIsVerifying = jest.fn();

    render(
      <VerifyEmailInformation
        email="email@example.com"
        setIsVerifying={mockSetIsVerifying}
      />,
    );

    const backButton = screen.getByText("Back");

    await userEvent.click(backButton);

    expect(mockSetIsVerifying).toHaveBeenCalled();
    expect(mockSetIsVerifying).toHaveBeenCalledWith(false);
  });
});
