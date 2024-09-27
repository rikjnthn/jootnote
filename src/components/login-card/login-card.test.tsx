import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginCard from ".";

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
        collection: jest.fn(),
      },
    }),
  };
});

describe("LoginCard Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    render(<LoginCard />);

    const heading = screen.getAllByText("Login")[0];
    expect(heading).toBeInTheDocument();

    const emailOrUsernameInput =
      screen.getByPlaceholderText("Email or username");
    expect(emailOrUsernameInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();

    const forgetPasswordLink = screen.getByText("Forget password");
    expect(forgetPasswordLink).toBeInTheDocument();
    expect(forgetPasswordLink).toHaveAttribute("href", "/reset-password");

    const createAccountLink = screen.getByText("Create Account");
    expect(createAccountLink).toBeInTheDocument();
    expect(createAccountLink).toHaveAttribute("href", "/sign-up");

    const submitButton = screen.getByTitle("Login");
    expect(submitButton).toBeInTheDocument();
  });

  it("should set error and invalid state to email or username input when input is invalid", async () => {
    render(<LoginCard />);

    const emailOrUsernameInput =
      screen.getByPlaceholderText("Email or username");
    const submitButton = screen.getByTitle("Login");

    await userEvent.click(submitButton);

    const errorEmptyInput = screen.getByText(
      "Please input your account email or username",
    );
    expect(errorEmptyInput).toBeInTheDocument();

    await userEvent.type(emailOrUsernameInput, "abc"); //username is less than 4 letters
    await userEvent.click(submitButton);

    const errorTooShort = screen.getByText(
      "Username should consist of 4 letters",
    );
    expect(errorTooShort).toBeInTheDocument();

    await userEvent.clear(emailOrUsernameInput);
    await userEvent.type(emailOrUsernameInput, "input with space");
    await userEvent.click(submitButton);

    const errorWithSpace = screen.getByText("Space character is not allowed");

    expect(errorWithSpace).toBeInTheDocument();
  });

  it("should set error and invalid state to password input when input is invalid", async () => {
    render(<LoginCard />);

    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByTitle("Login");

    await userEvent.click(submitButton);

    const errorEmptyInput = screen.getByText("Please input your password");
    expect(errorEmptyInput).toBeInTheDocument();

    await userEvent.type(passwordInput, "abc"); // password is less than 8 letters
    await userEvent.click(submitButton);

    const errorTooShort = screen.getByText(
      "Password should consist of 8 letters",
    );
    expect(errorTooShort).toBeInTheDocument();

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, "input with space");
    await userEvent.click(submitButton);

    const errorWithSpace = screen.getByText("Space character is not allowed");
    expect(errorWithSpace).toBeInTheDocument();

    const password65Letters = "r".repeat(65);

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, password65Letters);
    await userEvent.click(submitButton);

    const errorTooLong = screen.getByText(
      "Password should not be more than 64 letters",
    );
    expect(errorTooLong).toBeInTheDocument();
  });
});
