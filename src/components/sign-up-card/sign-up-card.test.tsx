import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUpCard from ".";
import { usePocketbase } from "@/context/pocketbase-context";

jest.mock("@/context/pocketbase-context", () => {
  return {
    usePocketbase: jest.fn().mockReturnValue({
      pb: {
        collection: jest.fn(),
      },
    }),
  };
});

function MockVerifyEmailInformation() {
  return <div>Verify email information</div>;
}

jest.mock(
  "@/components/verify-email-information",
  () => MockVerifyEmailInformation,
);

describe("SignUpCard Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    render(<SignUpCard />);

    const heading = screen.getByText("Sign Up");
    expect(heading).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();

    const usernameInput = screen.getByPlaceholderText("Username");
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();

    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm password");
    expect(confirmPasswordInput).toBeInTheDocument();

    const loginLink = screen.getByText("Login");
    expect(loginLink).toHaveAttribute("href", "/login");

    const submitButton = screen.getByTitle("Create");
    expect(submitButton).toBeInTheDocument();

    const verifyEmailInformation = screen.getByText("Verify email information");
    expect(verifyEmailInformation).toBeInTheDocument();

    const signUpWrapper = heading.parentElement;
    expect(signUpWrapper?.classList.contains("hidden")).toBeFalsy();

    expect(
      verifyEmailInformation.parentElement?.classList.contains("hidden"),
    ).toBeTruthy();
  });

  it("should set error and invalid state to email input when input is invalid", async () => {
    render(<SignUpCard />);

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByTitle("Create");

    await userEvent.click(submitButton);

    const errorEmptyInput = screen.getByText("Please input your email address");
    expect(errorEmptyInput).toBeInTheDocument();

    await userEvent.type(emailInput, "not_valid_email");
    await userEvent.click(submitButton);

    jest.mock("validator/es/lib/isEmail", () =>
      jest.fn().mockReturnValueOnce(false),
    );

    const errorEmailInvalid = screen.getByText("Email is not valid");
    expect(errorEmailInvalid).toBeInTheDocument();
  });

  it("should set error and invalid state to username input when input is invalid", async () => {
    render(<SignUpCard />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const submitButton = screen.getByTitle("Create");

    await userEvent.click(submitButton);

    const errorEmptyInput = screen.getByText("Please input your username");
    expect(errorEmptyInput).toBeInTheDocument();

    await userEvent.type(usernameInput, "abc"); // too short username
    await userEvent.click(submitButton);

    const errorTooShort = screen.getByText(
      "Username should consist of 4 letters",
    );
    expect(errorTooShort).toBeInTheDocument();

    await userEvent.clear(usernameInput);
    await userEvent.type(usernameInput, "r".repeat(21));
    await userEvent.click(submitButton);

    const errorTooLong = screen.getByText(
      "Username should not consist more than 20 letters",
    );
    expect(errorTooLong).toBeInTheDocument();

    await userEvent.clear(usernameInput);
    await userEvent.type(usernameInput, "invalid username");
    await userEvent.click(submitButton);

    const errorInvalidUsername = screen.getByText(
      "Space character is not allowed",
    );
    expect(errorInvalidUsername).toBeInTheDocument();
  });

  it("should set error and invalid state to password input when input is invalid", async () => {
    render(<SignUpCard />);

    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByTitle("Create");

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
    render(<SignUpCard />);

    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm password");
    const submitButton = screen.getByTitle("Create");

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

  it("should switch to VerifyEmailInformation Component if create user data is valid", async () => {
    (usePocketbase as jest.Mock).mockReturnValue({
      pb: {
        collection: jest.fn().mockReturnValue({
          create: jest.fn(),
          requestVerification: jest.fn(),
        }),
      },
    });
    render(<SignUpCard />);

    const emailInput = screen.getByPlaceholderText("Email");
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm password");
    const submitButton = screen.getByTitle("Create");

    await userEvent.type(emailInput, "example@email.com");
    await userEvent.type(usernameInput, "user123");
    await userEvent.type(passwordInput, "password");
    await userEvent.type(confirmPasswordInput, "password");
    await userEvent.click(submitButton);

    const verifyEmailInformation = screen.getByText(
      "Verify email information",
    ).parentElement;

    expect(verifyEmailInformation?.classList.contains("hidden")).toBeFalsy();
  });
});
