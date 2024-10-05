"use client";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import Pocketbase from "pocketbase";
import { jwtDecode } from "jwt-decode";

import { ONE_DAY_IN_MS, TWO_MINUTES_IN_MS } from "@/constant";

const PocketbaseContext = createContext<PocketbaseContextType | null>(null);

export const usePocketbase = () => {
  const context = useContext(PocketbaseContext);

  if (!context)
    throw new Error("usePocketbase must be use inside PocketbaseProvider");

  return context;
};

export const PocketbaseProvider = ({
  API_URL,
  children,
}: {
  API_URL?: string;
  children: React.ReactNode;
}) => {
  const pb = useMemo(() => new Pocketbase(API_URL), [API_URL]);
  const date = useRef(new Date()).current;

  useEffect(() => {
    if (!pb.authStore.token) return;

    const id = setInterval(async () => {
      if (!pb.authStore.isValid) return;

      const payload = jwtDecode(pb.authStore.token);

      if (!payload.exp) return;

      const tokenExpiration = payload.exp;
      const expirationWithBuffer = date.getMilliseconds() + ONE_DAY_IN_MS;

      if (tokenExpiration < expirationWithBuffer) {
        await pb.collection("users").authRefresh();

        pb.authStore.exportToCookie({
          httpOnly: false,
        });
      }
    }, TWO_MINUTES_IN_MS);

    return () => clearInterval(id);
  }, [pb, date]);

  return (
    <PocketbaseContext.Provider value={{ pb }}>
      {children}
    </PocketbaseContext.Provider>
  );
};

interface PocketbaseContextType {
  pb: Pocketbase;
}
