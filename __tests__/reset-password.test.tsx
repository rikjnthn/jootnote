import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ResetPassword from "@/app/reset-password/[token]/page";
import { usePocketbase } from "@/context/pocketbase-context";

jest.mock("@/context/pocketbase-context", () => {
  return {
    usePocketbase: jest.fn().mockReturnValue({
      pb: {},
    }),
  };
});

describe("ResetPassword Page Component", () => {
  it("should render correctly", () => {
    render(<ResetPassword params={{ token: "token" }} />);

    const heading = screen.getByText("Reset Password");
    expect(heading).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();

    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm password");
    expect(confirmPasswordInput).toBeInTheDocument();

    const submitButton = screen.getByTitle("Reset");
    expect(submitButton).toBeInTheDocument();

    const resetedInformationHeading = screen.getByText("Password Reset");
    expect(resetedInformationHeading).toBeInTheDocument();

    const resetedInformationText = screen.getByText(
      "Your password has been reset.",
    );
    expect(resetedInformationText).toBeInTheDocument();

    const loginLink = screen.getByText("Login now");
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");

    const changePasswordWrapper = heading.parentElement;
    expect(changePasswordWrapper?.classList.contains("hidden")).toBeFalsy();

    const resetedInformationWrapper =
      resetedInformationHeading.parentElement?.parentElement;
    expect(
      resetedInformationWrapper?.classList.contains("hidden"),
    ).toBeTruthy();
  });

  it("should set error and invalid state to input when input is invalid", async () => {
    render(<ResetPassword params={{ token: "token" }} />);

    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByTitle("Reset");

    await userEvent.click(submitButton);

    const errorEmptyInput = screen.getAllByText(
      "Please input your password",
    )[0];
    expect(errorEmptyInput).toBeInTheDocument();

    await userEvent.type(passwordInput, "abc"); // too short password
    await userEvent.click(submitButton);

    const errorTooShort = screen.getByText(
      "Password should consist of 8 letters",
    );
    expect(errorTooShort).toBeInTheDocument();

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, "r".repeat(65));
    await userEvent.click(submitButton);

    const errorTooLong = screen.getByText(
      "Password should not consist more than 64 letters",
    );
    expect(errorTooLong).toBeInTheDocument();

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, "invalid password");
    await userEvent.click(submitButton);

    const errorInvalidpassword = screen.getByText(
      "Space character is not allowed",
    );
    expect(errorInvalidpassword).toBeInTheDocument();
  });

  it("should set error and invalid state to confirm password input when input is invalid", async () => {
    render(<ResetPassword params={{ token: "token" }} />);

    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm password");
    const submitButton = screen.getByTitle("Reset");

    await userEvent.click(submitButton);

    const errorEmptyInput = screen.getAllByText(
      "Please input your password",
    )[1];
    expect(errorEmptyInput).toBeInTheDocument();

    await userEvent.clear(confirmPasswordInput);
    await userEvent.type(passwordInput, "password");
    await userEvent.type(confirmPasswordInput, "different_password");
    await userEvent.click(submitButton);

    const errorNotTheSame = screen.getByText(
      "Confirm password is not the same as password",
    );
    expect(errorNotTheSame).toBeInTheDocument();
  });

  it("should switch to password reset information if reset is valid", async () => {
    (usePocketbase as jest.Mock).mockReturnValue({
      pb: {
        collection: jest.fn().mockReturnValue({
          confirmPasswordReset: jest.fn(),
        }),
      },
    });

    render(<ResetPassword params={{ token: "token" }} />);

    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm password");
    const submitButton = screen.getByTitle("Reset");

    await userEvent.type(passwordInput, "password");
    await userEvent.type(confirmPasswordInput, "password");
    await userEvent.click(submitButton);

    const heading = screen.getByText("Reset Password");
    const resetedInformationHeading = screen.getByText("Password Reset");

    const changePasswordWrapper = heading.parentElement;
    expect(changePasswordWrapper?.classList.contains("hidden")).toBeTruthy();

    const resetedInformationWrapper =
      resetedInformationHeading.parentElement?.parentElement;
    expect(resetedInformationWrapper?.classList.contains("hidden")).toBeFalsy();
  });
});
