"use client";
import React, { useEffect, useRef, useState } from "react";
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

  const navRef = useRef<HTMLDivElement>(null);

  const { isOpenNav } = useNavigation();
  const { setIsOpenNav, setIsOpenSetting } = useNavigationDispatch();

  const closeNav = () => {
    setIsOpenNav(false);
  };

  const openSetting = () => {
    setIsOpenSetting(true);
    setIsOpenNav(false);
  };

  useEffect(() => {
    const handleTransitionEnd = (e: Event) => {
      if (!isOpenNav) {
        (e.currentTarget as HTMLDivElement)?.classList.add("max-md:invisible");
      }
    };

    const handleTransitionStart = (e: Event) => {
      if (isOpenNav) {
        (e.currentTarget as HTMLDivElement)?.classList.remove(
          "max-md:invisible",
        );
      }
    };

    const element = navRef.current;

    element?.addEventListener("transitionstart", handleTransitionStart);
    element?.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      element?.removeEventListener("transitionstart", handleTransitionStart);
      element?.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [isOpenNav]);

  return (
    <>
      <nav
        ref={navRef}
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
