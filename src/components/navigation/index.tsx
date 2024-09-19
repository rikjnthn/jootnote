"use client";
import React, { useState } from "react";
import clsx from "clsx";

import { SetStateType } from "@/interface";
import Logo from "../logo";
import DeleteIcon from "../delete-icon";
import FolderList from "../folder-list";
import SettingButton from "../setting-button";
import AddFolderButton from "../add-folder-button";
import { FolderProvider } from "@/context/folder-context";

const Navigation = ({
  isOpenNav,
  setIsOpenNav,
  setIsOpenSetting,
}: NavigationPropsType) => {
  const [isInputFolder, setIsInputFolder] = useState<boolean>(false);

  const closeNav = () => {
    setIsOpenNav(false);
  };

  const openSetting = () => {
    setIsOpenSetting(true);
    setIsOpenNav(false);
  };

  return (
    <>
      <nav
        className={clsx(
          "navigation fixed top-0 z-10 flex h-full w-full flex-col border-r border-r-gray-lightest bg-white py-5 xs:w-3/4 md:left-0 md:w-1/3 md:py-14 lg:max-w-80",
          isOpenNav ? "left-0" : "max-md:-left-full",
        )}
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

interface NavigationPropsType {
  isOpenNav: boolean;
  setIsOpenNav: SetStateType<boolean>;
  setIsOpenSetting: SetStateType<boolean>;
}
