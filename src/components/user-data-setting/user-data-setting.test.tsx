import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import UserDataSetting from ".";

jest.mock("@/context/pocketbase-context", () => {
  return {
    usePocketbase: jest.fn().mockReturnValue({
      pb: {
        authStore: {
          model: {
            username: "user",
          },
        },
        collection: jest.fn(),
      },
    }),
  };
});

describe("UserDataSetting Component ", () => {
  it("should render correctly", () => {
    const { container } = render(<UserDataSetting />);

    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
    expect(form?.classList.contains("gap-4")).toBeTruthy();

    const input = screen.getByPlaceholderText("Username");
    expect(input).toBeInTheDocument();

    const submitButton = screen.queryByRole("button");
    expect(submitButton).not.toBeInTheDocument();
  });

  it("should take user input and make changes so submit button appear", async () => {
    render(<UserDataSetting />);

    const input = screen.getByPlaceholderText("Username");
    expect(input).toHaveAttribute("value", "user");

    await userEvent.clear(input);
    await userEvent.type(input, "new-user");

    expect(input).toHaveAttribute("value", "new-user");

    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeInTheDocument();
  });

  it("should take user input and change user username", async () => {
    const { rerender } = render(<UserDataSetting />);

    const input = screen.getByPlaceholderText("Username");
    expect(input).toHaveAttribute("value", "user");

    await userEvent.clear(input);
    await userEvent.type(input, "new-user");

    expect(input).toHaveAttribute("value", "new-user");

    const submitButton = screen.getByRole("button");
    await userEvent.click(submitButton);

    expect(submitButton).not.toBeInTheDocument();

    jest.mock("@/context/pocketbase-context", () => {
      return {
        usePocketbase: jest.fn().mockReturnValue({
          pb: {
            authStore: {
              model: {
                username: "new-user",
              },
            },
            collection: jest.fn(),
          },
        }),
      };
    });

    rerender(<UserDataSetting />);

    expect(input).toHaveAttribute("value", "new-user");

    jest.clearAllMocks();
  });

  it("should form and input be invalid if user input not valid", async () => {
    const { container } = render(<UserDataSetting />);

    const form = container.querySelector("form");
    const input = screen.getByPlaceholderText("Username");

    await userEvent.clear(input);

    const errorEmptyInput = screen.getByText("Please input your new username");
    expect(errorEmptyInput).toBeInTheDocument();

    //prevent user to use whitespace
    await userEvent.type(input, "username with space");

    const errorUsernameInvalid = screen.getByText(
      "Username should not contain space character",
    );
    expect(errorUsernameInvalid).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, "r".repeat(21));

    const errorExceedCharacters = screen.getByText(
      "Username should not consist more than 20 letters",
    );
    expect(errorExceedCharacters).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, "abc"); //username less than 4 characters

    const errorLessCharacters = screen.getByText(
      "Username should consist of 4 letters",
    );
    expect(errorLessCharacters).toBeInTheDocument();

    expect(form?.classList.contains("gap-7")).toBeTruthy();
  });

  it("should prevent user from submit if input is invalid", async () => {
    render(<UserDataSetting />);

    const input = screen.getByPlaceholderText("Username");

    await userEvent.clear(input);

    // when user click the button and the input is invalid, the button not disappear
    const submitButton = screen.getByRole("button");

    await userEvent.click(submitButton);

    expect(submitButton).toBeInTheDocument();
  });
});
