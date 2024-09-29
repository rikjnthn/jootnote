"use client";
import React, { useState } from "react";
import clsx from "clsx";

import Logo from "../logo";
import DeleteIcon from "../delete-icon";
import FolderList from "../folder-list";
import SettingButton from "../setting-button";
import AddFolderButton from "../add-folder-button";
import { FolderProvider } from "@/context/folder-context";
import {
  useNavigation,
  useNavigationDispatch,
} from "@/context/navigation-context";

const Navigation = () => {
  const [isInputFolder, setIsInputFolder] = useState<boolean>(false);

  const { isOpenNav } = useNavigation();
  const { setIsOpenNav, setIsOpenSetting } = useNavigationDispatch();

  const closeNav = () => {
    setIsOpenNav(false);
  };

  const openSetting = () => {
    setIsOpenSetting(true);
    setIsOpenNav(false);
  };

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (!isOpenNav) {
      e.currentTarget.classList.add("max-md:invisible");
    }
  };

  const handleTransitionStart = (e: React.TransitionEvent) => {
    if (isOpenNav) {
      e.currentTarget.classList.remove("max-md:invisible");
    }
  };

  return (
    <>
      <nav
        className={clsx(
          "navigation fixed top-0 z-10 flex h-full w-full flex-col border-r border-r-gray-lightest bg-white py-5 xs:w-3/4 md:left-0 md:w-1/3 md:py-14 lg:max-w-80",
          isOpenNav ? "left-0" : "max-md:-left-full",
        )}
        onTransitionEnd={handleTransitionEnd}
        onTransitionStart={handleTransitionStart}
      >
        <div className="flex w-full items-center justify-between px-5 md:pt-3">
          <Logo />
          <div className="h-10 w-10 rounded-full hover:bg-neutral-200 md:hidden">
            <DeleteIcon onClick={closeNav} title="Close" />
          </div>
        </div>

        <FolderProvider>
          <FolderList
            isInputFolder={isInputFolder}
            setIsInputFolder={setIsInputFolder}
          />
        </FolderProvider>

        <div>
          <AddFolderButton onClick={() => setIsInputFolder(true)} />
          <SettingButton onClick={openSetting} />
        </div>
      </nav>

      <div
        onClick={closeNav}
        className={clsx(
          "dark_overlay md:hidden",
          isOpenNav ? "absolute" : "hidden",
        )}
      />
    </>
  );
};

export default Navigation;
