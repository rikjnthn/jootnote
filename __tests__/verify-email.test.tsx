import { render, screen } from "@testing-library/react";

import VerifyEmail from "@/app/verify-email/page";

jest.mock("@/context/pocketbase-context", () => {
  return {
    usePocketbase: jest.fn().mockReturnValue({
      pb: {},
    }),
  };
});

function MockButtonWithTimer() {
  return <div>Button with timer</div>;
}

jest.mock("@/components/button-with-timer", () => MockButtonWithTimer);

describe("VerifyEmail Page Component", () => {
  it("should render correctly", () => {
    render(<VerifyEmail />);

    const heading = screen.getByText("Verify Your Account");
    expect(heading).toBeInTheDocument();

    const text = screen.getByText(/We have send you a verification email/i);
    expect(text).toBeInTheDocument();

    const buttonWithTimer = screen.getByText("Button with timer");
    expect(buttonWithTimer).toBeInTheDocument();
  });
});
