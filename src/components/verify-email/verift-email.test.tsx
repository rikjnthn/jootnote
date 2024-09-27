import { render, screen } from "@testing-library/react";

import VerifyEmail from ".";

const mockVerifyEmail = jest.fn();

jest.mock("@/util/verify-email", () => () => mockVerifyEmail());

describe("VerifyEmail Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly when email is verified", async () => {
    mockVerifyEmail.mockResolvedValueOnce(true),
      render(await VerifyEmail({ token: "token" }));

    const heading = screen.getByText("Account Verified");
    expect(heading).toBeInTheDocument();

    const text = screen.getByText(/Your account has been verified/);
    expect(text).toBeInTheDocument();

    const loginLink = screen.getByText<HTMLLinkElement>("Login now");
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.href).toContain("/login");
  });

  it("should render correctly when email is not verified due to invalid token", async () => {
    mockVerifyEmail.mockResolvedValueOnce(false);

    render(await VerifyEmail({ token: "invalid_token" }));

    const heading = screen.getByText("Token Is Invalid");
    expect(heading).toBeInTheDocument();

    const text = screen.getByText(/Your token is invalid or may be expired/);
    expect(text).toBeInTheDocument();
  });
});
