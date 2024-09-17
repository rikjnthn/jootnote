"use client";
import React, { useState } from "react";

import Hamburger from "../hamburger";
import Navigation from "../navigation";
import Setting from "../setting";

const Header = () => {
  const [isOpenNav, setIsOpenNav] = useState<boolean>(false);
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);

  return (
    <>
      <header className="flex justify-between p-5 md:hidden">
        <div className="flex items-center gap-4">
          <Hamburger onClick={() => setIsOpenNav(true)} />
          <span className="text-2xl font-medium">Notes</span>
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
