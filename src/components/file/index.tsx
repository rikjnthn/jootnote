"use client";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import React, { useState } from "react";
import clsx from "clsx";
import { ClientResponseError } from "pocketbase";

import DeleteIcon from "../delete-icon";
import EditIcon from "../edit-icon";
import { usePocketbase } from "@/context/pocketbase-context";
import { useFolder } from "@/context/folder-context";
import FileEdit from "../file-edit";

const File = ({ id, name, folderId }: FilePropsType) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

  const router = useRouter();
  const { pb } = usePocketbase();
  const { setFolders } = useFolder();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsLoadingDelete(true);
    try {
      await pb.collection("files").delete(id);

      setFolders((prev) => {
        const newFolders = prev.map((folder) => {
          if (folder.id !== folderId) return folder;

          return {
            ...folder,
            files: folder.files.filter((file) => file.id !== id),
          };
        });

        return newFolders;
      });
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error: " + e.message);
      }
    } finally {
      setIsLoadingDelete(false);
      router.push("/");
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsEdit(true);
  };

  const openFile = () => {
    router.push(`/note/${id}`);
  };

  const segments = useSelectedLayoutSegments();
  const isFileOpened = segments[1] ? segments[1] === id : false;

  return (
    <div
      onClick={openFile}
      className={clsx(
        "file flex items-center justify-between py-2 pl-13 pr-5 hover:bg-neutral-200 active:bg-neutral-400",
        {
          hidden: isLoadingDelete,
          "bg-neutral-300": isFileOpened,
        },
      )}
    >
      {isEdit ? (
        <FileEdit
          fileId={id}
          folderId={folderId}
          fileName={name}
          setIsEdit={setIsEdit}
        />
      ) : (
        <span className="line-clamp-1 md:text-lg">{name} </span>
      )}

      <div className={clsx("file-util flex items-center", { hidden: isEdit })}>
        <EditIcon onClick={handleEdit} />
        <DeleteIcon onClick={handleDelete} title="Delete file" />
      </div>
    </div>
  );
};

export default File;

interface FilePropsType {
  id: string;
  name: string;
  folderId: string;
}
