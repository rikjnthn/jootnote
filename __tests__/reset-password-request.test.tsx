import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RequestResetPassword from "@/app/reset-password/page";
import { usePocketbase } from "@/context/pocketbase-context";

jest.mock("@/context/pocketbase-context", () => {
  return {
    usePocketbase: jest.fn().mockResolvedValue({
      pb: {},
    }),
  };
});

function MockButtonWithTimer() {
  return <div>Button with timer</div>;
}

jest.mock("@/components/button-with-timer", () => MockButtonWithTimer);

describe("RequestPasswordReset Page Component", () => {
  it("should render correctly", () => {
    render(<RequestResetPassword />);

    const heading = screen.getByText("Request Reset Password");
    expect(heading).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();

    const submitButton = screen.getByTitle("Request");
    expect(submitButton).toBeInTheDocument();

    const requestInformationHeading = screen.getByText(
      "Reset Password Requested",
    );
    expect(requestInformationHeading).toBeInTheDocument();

    const requestInformationText = screen.getByText(
      /Your reset password request has been sent/i,
    );
    expect(requestInformationText).toBeInTheDocument();

    const backButton = screen.getByTitle("Back");
    expect(backButton).toBeInTheDocument();

    const resendButton = screen.getByText("Button with timer");
    expect(resendButton).toBeInTheDocument();

    const requestResetWrapper = heading.parentElement;
    expect(requestResetWrapper?.classList.contains("hidden")).toBeFalsy();

    const requestInformationWrapper =
      requestInformationHeading.parentElement?.parentElement;
    expect(
      requestInformationWrapper?.classList.contains("hidden"),
    ).toBeTruthy();
  });

  it("should set error and invalid state to input when input is invalid", async () => {
    render(<RequestResetPassword />);

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByTitle("Request");

    await userEvent.click(submitButton);

    const errorEmptyInput = screen.getByText("Please input your account email");
    expect(errorEmptyInput).toBeInTheDocument();

    await userEvent.type(emailInput, "invalid email");
    await userEvent.click(submitButton);

    const errorInvalidEmail = screen.getByText("Email is not valid");
    expect(errorInvalidEmail).toBeInTheDocument();
  });

  it("should switch to request information if email input is valid", async () => {
    (usePocketbase as jest.Mock).mockReturnValue({
      pb: {
        collection: jest.fn().mockReturnValue({
          requestPasswordReset: jest.fn(),
        }),
      },
    });

    render(<RequestResetPassword />);

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByTitle("Request");

    await userEvent.type(emailInput, "email@example.com");
    await userEvent.click(submitButton);

    const heading = screen.getByText("Request Reset Password");
    const requestResetWrapper = heading.parentElement;
    expect(requestResetWrapper?.classList.contains("hidden")).toBeTruthy();

    const requestInformationHeading = screen.getByText(
      "Reset Password Requested",
    );
    const requestInformationWrapper =
      requestInformationHeading.parentElement?.parentElement;
    expect(requestInformationWrapper?.classList.contains("hidden")).toBeFalsy();
  });
});
