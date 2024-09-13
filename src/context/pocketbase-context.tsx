"use client";
import { createContext, useContext, useMemo } from "react";
import Pocketbase from "pocketbase";

const PocketbaseContext = createContext<PocketbaseContextType | null>(null);

export const usePocketbase = () => {
  const context = useContext(PocketbaseContext);

  if (!context)
    throw new Error("usePocketbase must be use inside PocketbaseProvider");

  return context;
};

export default function PocketbaseProvider({
  API_URL,
  children,
}: {
  API_URL?: string;
  children: React.ReactNode;
}) {
  const pb = useMemo(() => new Pocketbase(API_URL), [API_URL]);

  return (
    <PocketbaseContext.Provider value={{ pb }}>
      {children}
    </PocketbaseContext.Provider>
  );
}

interface PocketbaseContextType {
  pb: Pocketbase;
}
