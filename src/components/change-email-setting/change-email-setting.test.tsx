import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ChangeEmailSetting from ".";

jest.mock("@/context/pocketbase-context", () => {
  return {
    usePocketbase: jest.fn().mockReturnValue({
      pb: {
        authStore: {
          model: {
            email: "email@example.com",
          },
        },
        collection: jest.fn(),
      },
    }),
  };
});

jest.mock("@/context/navigation-context", () => {
  return {
    useNavigation: jest.fn().mockReturnValue({
      isOpenNav: true,
    }),
  };
});

describe("ChangeEmailSetting Component", () => {
  it("should render correctly", () => {
    const { container } = render(<ChangeEmailSetting />);

    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
    expect(form?.classList.contains("gap-4")).toBeTruthy();

    const input = screen.getByPlaceholderText("Email");
    expect(input).toBeInTheDocument();

    const submitButton = screen.queryByRole("button");
    expect(submitButton).not.toBeInTheDocument();
  });

  it("should take user input and make changes so submit button appear", async () => {
    render(<ChangeEmailSetting />);

    const input = screen.getByPlaceholderText("Email");
    expect(input).toHaveAttribute("value", "email@example.com");

    await userEvent.clear(input);
    await userEvent.type(input, "change-email@example.com");

    expect(input).toHaveAttribute("value", "change-email@example.com");

    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeInTheDocument();
  });

  it("should take user input and change user email", async () => {
    const { rerender } = render(<ChangeEmailSetting />);

    const input = screen.getByPlaceholderText("Email");
    expect(input).toHaveAttribute("value", "email@example.com");

    await userEvent.clear(input);
    await userEvent.type(input, "change-email@example.com");

    expect(input).toHaveAttribute("value", "change-email@example.com");

    const submitButton = screen.getByRole("button");
    await userEvent.click(submitButton);

    expect(submitButton).not.toBeInTheDocument();

    jest.mock("@/context/pocketbase-context", () => {
      return {
        usePocketbase: jest.fn().mockReturnValue({
          pb: {
            authStore: {
              model: {
                email: "change-email@example.com",
              },
            },
            collection: jest.fn(),
          },
        }),
      };
    });

    rerender(<ChangeEmailSetting />);

    expect(input).toHaveAttribute("value", "change-email@example.com");

    jest.clearAllMocks();
  });

  it("should form and input be invalid if user input not valid", async () => {
    const { container } = render(<ChangeEmailSetting />);

    const form = container.querySelector("form");
    const input = screen.getByPlaceholderText("Email");

    await userEvent.clear(input);

    const errorEmptyInput = screen.getByText("Please input your email");
    expect(errorEmptyInput).toBeInTheDocument();

    await userEvent.type(input, "invalid-email");

    const errorEmailInvalid = screen.getByText("Email is not valid");
    expect(errorEmailInvalid).toBeInTheDocument();

    expect(form?.classList.contains("gap-7")).toBeTruthy();
  });

  it("should prevent user from submit if input is invalid", async () => {
    render(<ChangeEmailSetting />);

    const input = screen.getByPlaceholderText("Email");

    await userEvent.clear(input);

    // when user click the button and the input is invalid, the button not disappear
    const submitButton = screen.getByRole("button");

    await userEvent.click(submitButton);

    expect(submitButton).toBeInTheDocument();
  });
});
