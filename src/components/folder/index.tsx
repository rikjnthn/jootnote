"use client";
import React, { useState } from "react";
import clsx from "clsx";

import ArrowIcon from "../arrow-icon";
import EditIcon from "../edit-icon";
import DeleteIcon from "../delete-icon";
import PlusIcon from "../plus-icon";
import FileList from "../file-list";
import { usePocketbase } from "@/context/pocketbase-context";
import { FolderType, SetStateType } from "@/interface";

const Folder = ({ name, folderId, setFolder }: FolderPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

  const { pb } = usePocketbase();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsLoadingDelete(true);
    try {
      await pb.collection("folders").delete(folderId);

      setFolder((prev) => prev.filter((folder) => folder.id !== folderId));
    } catch (e) {
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <div className={clsx("cursor-default", { hidden: isLoadingDelete })}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="folder flex justify-between py-2.5"
      >
        <div className="flex items-center">
          <ArrowIcon isOpen={isOpen} />
          <span className="line-clamp-1 font-medium md:text-lg">{name}</span>
        </div>

        <div className="folder-util flex items-center">
          <EditIcon />
          <DeleteIcon onClick={handleDelete} title="Delete folder" />
          <PlusIcon title="Add file" />
        </div>
      </div>

      <div className={clsx(!isOpen && "hidden")}>
        <FileList />
      </div>
    </div>
  );
};

export default Folder;

interface FolderPropsType {
  name: string;
  folderId: string;
  setFolder: SetStateType<FolderType[]>;
}
