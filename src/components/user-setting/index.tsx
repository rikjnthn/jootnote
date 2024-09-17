"use client";
import React from "react";

import LogoutButton from "../logout-button";
import DeleteAccountButton from "../delete-account-button";
import UserDataSetting from "../user-data-setting";
import ChangeEmailSetting from "../change-email-setting";

const UserSetting = () => {
  return (
    <div className="flex flex-col gap-10 p-5 px-[30px]">
      <UserDataSetting />

      <ChangeEmailSetting />

      <div>
        <span className="text-xl font-semibold md:text-2xl">Account</span>
        <div className="flex justify-between pt-4">
          <LogoutButton />
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
