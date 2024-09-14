"use client";
import React, { useState } from "react";
import clsx from "clsx";

import ArrowIcon from "../arrow-icon";
import EditIcon from "../edit-icon";
import DeleteIcon from "../delete-icon";
import PlusIcon from "../plus-icon";
import FileList from "../file-list";
import { usePocketbase } from "@/context/pocketbase-context";
import EditFolder from "../edit-folder";
import { useFolder } from "@/context/folder-context";

const Folder = ({ name, folderId }: FolderPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

  const { pb } = usePocketbase();
  const { setFolders } = useFolder();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsLoadingDelete(true);
    try {
      await pb.collection("folders").delete(folderId);

      setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
    } catch (e) {
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const setEditing = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsEdit(true);
  };

  return (
    <div className={clsx("cursor-default", { hidden: isLoadingDelete })}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="folder flex justify-between py-2.5"
      >
        <div className="flex items-center">
          <ArrowIcon isOpen={isOpen} />

          {isEdit ? (
            <EditFolder
              folderId={folderId}
              folderName={name}
              setIsEdit={setIsEdit}
            />
          ) : (
            <span className="line-clamp-1 font-medium md:text-lg">{name}</span>
          )}
        </div>

        {!isEdit && (
          <div className="folder-util flex items-center">
            <EditIcon onClick={setEditing} />
            <DeleteIcon onClick={handleDelete} title="Delete folder" />
            <PlusIcon title="Add file" />
          </div>
        )}
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
}
