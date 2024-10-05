"use client";
import { SetStateType } from "@/interface";
import { createContext, useContext, useState } from "react";

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);
const NavigationDispatchContext = createContext<
  NavigationDispatchContextType | undefined
>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);

  if (!context)
    throw new Error("useNavigation must be used inside a NavigationProvider");

  return context;
};

export const useNavigationDispatch = () => {
  const context = useContext(NavigationDispatchContext);

  if (!context)
    throw new Error(
      "useNavigationsDispatch must be used inside a NavigationDispatchProvider",
    );

  return context;
};

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpenNav, setIsOpenNav] = useState<boolean>(false);
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);

  return (
    <NavigationDispatchContext.Provider
      value={{ setIsOpenNav, setIsOpenSetting }}
    >
      <NavigationContext.Provider value={{ isOpenNav, isOpenSetting }}>
        {children}
      </NavigationContext.Provider>
    </NavigationDispatchContext.Provider>
  );
};

interface NavigationContextType {
  isOpenNav: boolean;
  isOpenSetting: boolean;
}

interface NavigationDispatchContextType {
  setIsOpenNav: SetStateType<boolean>;
  setIsOpenSetting: SetStateType<boolean>;
}
