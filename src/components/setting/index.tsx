"use client";
import React from "react";
import clsx from "clsx";

import BackIcon from "../back-icon";
import UserSetting from "../user-setting";
import { SetStateType } from "@/interface";

const Setting = ({
  isOpenSetting,
  setIsOpenSetting,
}: {
  isOpenSetting: boolean;
  setIsOpenSetting: SetStateType<boolean>;
}) => {
  return (
    <div
      className={clsx(
        "setting absolute top-0 flex h-full w-full flex-col bg-white md:max-w-md",
        isOpenSetting ? "right-0" : "-right-full",
      )}
    >
      <div className="flex items-center gap-4 p-5">
        <BackIcon onClick={() => setIsOpenSetting(false)} />
        <span className="text-xl font-medium md:text-2xl">Setting</span>
      </div>

      <UserSetting />
    </div>
  );
};

export default Setting;
