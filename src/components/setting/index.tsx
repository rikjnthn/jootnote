"use client";
import React from "react";
import clsx from "clsx";

import BackIcon from "../back-icon";
import UserSetting from "../user-setting";
import {
  useNavigation,
  useNavigationDispatch,
} from "@/context/navigation-context";

const Setting = () => {
  const { isOpenSetting } = useNavigation();
  const { setIsOpenSetting } = useNavigationDispatch();

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (!isOpenSetting) {
      e.currentTarget.classList.add("invisible");
    }
  };

  const handleTransitionStart = (e: React.TransitionEvent) => {
    if (isOpenSetting) {
      e.currentTarget.classList.remove("invisible");
    }
  };

  return (
    <div
      className={clsx(
        "setting absolute top-0 flex h-full w-full flex-col bg-white md:max-w-md",
        isOpenSetting ? "right-0" : "-right-full",
      )}
      onTransitionStart={handleTransitionStart}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="flex items-center gap-4 p-5">
        <div className="h-10 w-10 rounded-full hover:bg-neutral-200">
          <BackIcon onClick={() => setIsOpenSetting(false)} />
        </div>
        <span className="text-xl font-medium md:text-2xl">Setting</span>
      </div>

      <UserSetting />
    </div>
  );
};

export default Setting;
