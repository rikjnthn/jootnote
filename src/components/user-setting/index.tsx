"use client";
import React from "react";

import LogoutButton from "../logout-button";
import DeleteAccountButton from "../delete-account-button";
import UserDataSetting from "../user-data-setting";
import ChangeEmailSetting from "../change-email-setting";

const UserSetting = () => {
  return (
    <div className="flex h-full flex-col gap-10 p-5 px-[30px]">
      <UserDataSetting />

      <ChangeEmailSetting />

      <div className="mt-auto flex flex-col justify-between gap-4">
        <LogoutButton />
        <DeleteAccountButton />
      </div>
    </div>
  );
};

export default UserSetting;
