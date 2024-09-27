import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ChangeEmailPage from "@/app/change-email/[token]/page";
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

describe("ChangeEmail Page Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    render(<ChangeEmailPage params={{ token: "token" }} />);

    const heading = screen.getByText("Confirm Email Change");
    expect(heading).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();

    const submitButton = screen.getByTitle("Change");
    expect(submitButton).toBeInTheDocument();

    const emailChangeStatusHeading = screen.getByText("Email Has Been Changed");
    expect(emailChangeStatusHeading).toBeInTheDocument();

    const emailChangeStatusText = screen.getByText(
      /This action automatically logout/i,
    );
    expect(emailChangeStatusText).toBeInTheDocument();

    const loginLink = screen.getByText("Login");
    expect(loginLink).toBeInTheDocument();
  });

  it("should set error and invalid state to input when input is invalid", async () => {
    render(<ChangeEmailPage params={{ token: "token" }} />);

    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByTitle("Change");

    await userEvent.click(submitButton);

    const errorEmptyInput = screen.getByText("Please input your password");
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

    const errorInvalidPassword = screen.getByText(
      "Space character is not allowed",
    );
    expect(errorInvalidPassword).toBeInTheDocument();
  });

  it("should swith to change email status if request is valid", async () => {
    (usePocketbase as jest.Mock).mockReturnValue({
      pb: {
        collection: jest.fn().mockReturnValue({
          confirmEmailChange: jest.fn().mockReturnValue(null),
        }),
      },
    });

    render(<ChangeEmailPage params={{ token: "token" }} />);

    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByTitle("Change");

    await userEvent.type(passwordInput, "password");
    await userEvent.click(submitButton);

    const loginLink = screen.getByText("Login");
    const emailChangeStatusWrapper = loginLink.parentElement?.parentElement;

    expect(emailChangeStatusWrapper?.classList.contains("hidden")).toBeFalsy();
  });
});
