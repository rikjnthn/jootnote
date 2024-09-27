"use client";
import React from "react";

import { useFolders } from "@/context/folder-context";
import Folder from "../folder";
import { SetStateType } from "@/interface";
import FolderInput from "../folder-input";

const FolderList = ({
  isInputFolder,
  setIsInputFolder,
}: FolderListPropsType) => {
  const folders = useFolders();
  return (
    <ul className="hide-scrollbar h-full overflow-y-scroll pt-2.5 md:mt-14">
      {folders.map((folder) => (
        <Folder
          key={folder.id}
          id={folder.id}
          name={folder.name}
          files={folder.files}
        />
      ))}

      <FolderInput
        isInputFolder={isInputFolder}
        setIsInputFolder={setIsInputFolder}
      />
    </ul>
  );
};

export default FolderList;

interface FolderListPropsType {
  isInputFolder: boolean;
  setIsInputFolder: SetStateType<boolean>;
}
