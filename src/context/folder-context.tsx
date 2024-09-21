"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Pocketbase, { ClientResponseError, RecordModel } from "pocketbase";

import { usePocketbase } from "./pocketbase-context";
import { FolderType, SetStateType } from "@/interface";

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

const getFolders = async ({
  pb,
  setFolders,
}: {
  pb: Pocketbase;
  setFolders: SetStateType<FolderType[]>;
}) => {
  try {
    const userId = pb.authStore.model?.id;

    const records = await pb
      .collection("folders")
      .getFullList<FolderType & RecordModel>({
        filter: pb.filter("user.id = {:userId}", { userId }),
        expand: "files_via_folder",
      });

    const folders = records.map<FolderType>(({ id, name, expand }) => ({
      id,
      name,
      files: expand?.files_via_folder ?? [],
    }));

    setFolders(folders);
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
    <FolderDispatchContext.Provider value={setFolders}>
      <FolderContext.Provider value={folders}>
        {children}
      </FolderContext.Provider>
    </FolderDispatchContext.Provider>
  );
};

type FolderContextType = FolderType[];
type FoldersDispatchContextType = SetStateType<FolderType[]>;
