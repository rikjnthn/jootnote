"use client";
import { createContext, useContext, useEffect, useState } from "react";

import { usePocketbase } from "./pocketbase-context";
import { FolderType, SetStateType } from "@/interface";
import getFolders from "@/util/get-folders";

const FolderContext = createContext<FolderContextType | undefined>(undefined);
const FolderDispatchContext = createContext<
  FoldersDispatchContextType | undefined
>(undefined);

export const useFolders = () => {
  const context = useContext(FolderContext);

  if (!context)
    throw new Error("useFolders must be used inside a FolderProvider");

  return context;
};

export const useFoldersDispatch = () => {
  const context = useContext(FolderDispatchContext);

  if (!context)
    throw new Error(
      "useFoldersDispatch must be used inside a FolderDispatchProvider",
    );

  return context;
};

export const FolderProvider = ({ children }: { children: React.ReactNode }) => {
  const [folders, setFolders] = useState<FolderType[]>([]);

  const { pb } = usePocketbase();

  useEffect(() => {
    getFolders(pb, setFolders);
  }, [pb]);

  return (
    <FolderDispatchContext.Provider value={setFolders}>
      <FolderContext.Provider value={folders}>
        {children}
      </FolderContext.Provider>
    </FolderDispatchContext.Provider>
  );
};

type FolderContextType = FolderType[];
type FoldersDispatchContextType = SetStateType<FolderType[]>;
