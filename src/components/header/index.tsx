"use client";
import React from "react";

import Hamburger from "../hamburger";
import Navigation from "../navigation";
import Setting from "../setting";
import { useNavigationDispatch } from "@/context/navigation-context";

const Header = () => {
  const { setIsOpenNav } = useNavigationDispatch();

  return (
    <>
      <header className="flex justify-between p-5 md:hidden">
        <div className="flex items-center gap-4">
          <Hamburger onClick={() => setIsOpenNav(true)} />
          <span className="text-2xl font-medium">Notes</span>
        </div>
      </header>

      <Navigation />

      <Setting />
    </>
  );
};

export default Header;
