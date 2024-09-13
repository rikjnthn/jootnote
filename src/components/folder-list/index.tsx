"use client";
import React, { useEffect, useState } from "react";
import Pocketbase, { ClientResponseError } from "pocketbase";

import Folder from "../folder";
import { FolderType, SetStateType } from "@/interface";
import { usePocketbase } from "@/context/pocketbase-context";
import FolderInput from "../folder-input";

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

const FolderList = ({
  isInputFolder,
  setIsInputFolder,
}: FolderListPropsType) => {
  const [folders, setFolders] = useState<FolderType[]>([]);

  const { pb } = usePocketbase();

  useEffect(() => {
    getFolders({ pb, setFolders });
  }, [pb]);

  return (
    <div className="hide-scrollbar h-full overflow-y-scroll px-1 pt-2.5 md:mt-14">
      {folders.map((folder) => (
        <Folder key={folder.id} name={folder.name} />
      ))}

      <FolderInput
        isInputFolder={isInputFolder}
        folders={folders}
        setIsInputFolder={setIsInputFolder}
        setFolders={setFolders}
      />
    </div>
  );
};

export default FolderList;

interface FolderListPropsType {
  isInputFolder: boolean;
  setIsInputFolder: SetStateType<boolean>;
}
