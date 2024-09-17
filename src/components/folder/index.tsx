"use client";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
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
import { FileType } from "@/interface";

const Folder = ({ name, id, files }: FolderPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [isInputFile, setIsInputFile] = useState<boolean>(false);

  const segments = useSelectedLayoutSegments();
  const router = useRouter();
  const { pb } = usePocketbase();
  const { setFolders } = useFolder();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsLoadingDelete(true);
    try {
      await pb.collection("folders").delete(id);

      // if user open the file where it placed in the folder that is going to be deleted, navigate to main app
      if (
        segments[0] === "note" &&
        !!files.find((file) => file.id === segments[1])
      ) {
        router.push("/");
      }

      setFolders((prev) => prev.filter((folder) => folder.id !== id));
    } catch (e) {
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const setEditing = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsEdit(true);
  };

  const setInputFile = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsInputFile(true);
    setIsOpen(true);
  };

  return (
    <div className={clsx("cursor-default", { hidden: isLoadingDelete })}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="folder flex justify-between px-5 py-2.5 hover:bg-stone-200 active:bg-stone-400"
      >
        <div className="flex items-center">
          <ArrowIcon isOpen={isOpen} />

          {isEdit ? (
            <EditFolder folderId={id} folderName={name} setIsEdit={setIsEdit} />
          ) : (
            <span className="line-clamp-1 font-medium md:text-lg">{name}</span>
          )}
        </div>

        {!isEdit && (
          <div className="folder-util flex items-center">
            <EditIcon onClick={setEditing} />
            <DeleteIcon onClick={handleDelete} title="Delete folder" />
            <PlusIcon onClick={setInputFile} title="Add file" />
          </div>
        )}
      </div>

      <div className={clsx(!isOpen && "hidden")}>
        <FileList
          files={files}
          folderId={id}
          isInputFile={isInputFile}
          setIsInputFile={setIsInputFile}
        />
      </div>
    </div>
  );
};

export default Folder;

interface FolderPropsType {
  name: string;
  id: string;
  files: FileType[];
}
