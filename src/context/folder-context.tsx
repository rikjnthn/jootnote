"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Pocketbase, { ClientResponseError } from "pocketbase";

import { usePocketbase } from "./pocketbase-context";
import { FolderType, SetStateType } from "@/interface";

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const useFolder = () => {
  const context = useContext(FolderContext);

  if (!context)
    throw new Error("useFolder must be used inside a FolderProvider");

  return context;
};

const getFolders = async ({
  pb,
  setFolders,
}: {
  pb: Pocketbase;
  setFolders: SetStateType<FolderType[]>;
}) => {
  try {
    const userId = pb.authStore.model?.id;

    const records = await pb.collection("folders").getFullList<FolderType>({
      filter: pb.filter("user.id = {:userId}", { userId }),
    });

    setFolders(records);
  } catch (e) {
    if (e instanceof ClientResponseError) {
      console.error("Error: " + e.message);
    }
  }
};

export const FolderProvider = ({ children }: { children: React.ReactNode }) => {
  const [folders, setFolders] = useState<FolderType[]>([]);

  const { pb } = usePocketbase();

  useEffect(() => {
    getFolders({ pb, setFolders });
  }, [pb]);

  return (
    <FolderContext.Provider value={{ folders, setFolders }}>
      {children}
    </FolderContext.Provider>
  );
};

interface FolderContextType {
  folders: FolderType[];
  setFolders: SetStateType<FolderType[]>;
}
