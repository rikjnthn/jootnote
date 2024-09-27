import { render, screen } from "@testing-library/react";

import UserSetting from ".";

function MockUserDataSetting() {
  return <div>User data setting</div>;
}

function MockChangeEmailSetting() {
  return <div>Change email setting</div>;
}

function MockLogoutButton() {
  return <button>Logout button</button>;
}

function MockDeleteAccountButton() {
  return <button>Delete account button</button>;
}

jest.mock("@/components/user-data-setting", () => MockUserDataSetting);
jest.mock("@/components/change-email-setting", () => MockChangeEmailSetting);
jest.mock("@/components/logout-button", () => MockLogoutButton);
jest.mock("@/components/delete-account-button", () => MockDeleteAccountButton);

describe("UserSetting Component", () => {
  it("should render correctly", () => {
    render(<UserSetting />);

    const spanText = screen.getByText("User");
    expect(spanText).toBeInTheDocument();

    const userDatasSetting = screen.getByText("User data setting");
    expect(userDatasSetting).toBeInTheDocument();

    const changeEmailSetting = screen.getByText("Change email setting");
    expect(changeEmailSetting).toBeInTheDocument();

    const logoutButton = screen.getByText("Logout button");
    expect(logoutButton).toBeInTheDocument();

    const deleteAccountButton = screen.getByText("Delete account button");
    expect(deleteAccountButton).toBeInTheDocument();
  });
});
