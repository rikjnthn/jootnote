"use client";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";

import BackIcon from "../back-icon";
import UserSetting from "../user-setting";
import {
  useNavigation,
  useNavigationDispatch,
} from "@/context/navigation-context";

const Setting = () => {
  const settingRef = useRef<HTMLDivElement>(null);

  const { isOpenSetting } = useNavigation();
  const { setIsOpenSetting } = useNavigationDispatch();

  useEffect(() => {
    const handleTransitionEnd = (e: Event) => {
      if (!isOpenSetting) {
        (e.currentTarget as HTMLDivElement)?.classList.add("invisible");
      }
    };

    const handleTransitionStart = (e: Event) => {
      if (isOpenSetting) {
        (e.currentTarget as HTMLDivElement)?.classList.remove("invisible");
      }
    };
    const element = settingRef.current;

    element?.addEventListener("transitionstart", handleTransitionStart);
    element?.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      element?.removeEventListener("transitionstart", handleTransitionStart);
      element?.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [isOpenSetting]);

  return (
    <div
      ref={settingRef}
      className={clsx(
        "setting absolute top-0 flex h-full w-full flex-col bg-white md:max-w-md",
        isOpenSetting ? "right-0" : "-right-full",
      )}
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
