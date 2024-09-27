"use client";
import React from "react";

import LogoutButton from "../logout-button";
import DeleteAccountButton from "../delete-account-button";
import UserDataSetting from "../user-data-setting";
import ChangeEmailSetting from "../change-email-setting";

const UserSetting = () => {
  return (
    <div className="flex h-full flex-col p-5 px-7.5">
      <div>
        <span className="mb-4 text-xl font-semibold md:text-2xl">User</span>

        <div className="flex flex-col gap-10">
          <UserDataSetting />

          <ChangeEmailSetting />
        </div>
      </div>

      <div className="mt-auto flex flex-col justify-between gap-4">
        <LogoutButton />
        <DeleteAccountButton />
      </div>
    </div>
  );
};

export default UserSetting;
