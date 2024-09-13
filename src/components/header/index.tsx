"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import clsx from "clsx";

import LockIcon from "../lock-icon";
import Hamburger from "../hamburger";
import BinIcon from "../bin-icon";
import Navigation from "../navigation";
import Setting from "../setting";

const Header = () => {
  const [isOpenNav, setIsOpenNav] = useState<boolean>(false);
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);

  const pathname = usePathname();

  const isHome = pathname === "/";
  return (
    <>
      <header className="flex justify-between p-5 md:hidden">
        <div className="flex items-center gap-4">
          <Hamburger onClick={() => setIsOpenNav(true)} />
          <span className="text-2xl font-medium">Notes</span>
        </div>
        <div className={clsx(isHome ? "hidden" : "flex")}>
          <LockIcon />
          <BinIcon />
        </div>
      </header>

      <Navigation
        isOpenNav={isOpenNav}
        setIsOpenNav={setIsOpenNav}
        setIsOpenSetting={setIsOpenSetting}
      />

      <Setting
        isOpenSetting={isOpenSetting}
        setIsOpenSetting={setIsOpenSetting}
      />
    </>
  );
};

export default Header;
