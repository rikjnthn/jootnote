import React, { FormEvent, useState } from "react";
import clsx from "clsx";
import { ClientResponseError } from "pocketbase";

import { FolderDataType, SetStateType } from "@/interface";
import { useFolders, useFoldersDispatch } from "@/context/folder-context";
import { usePocketbase } from "@/context/pocketbase-context";

const EditFolder = ({
  folderId,
  folderName,
  setIsEdit,
}: EditFolderPropsType) => {
  const [newName, setNewName] = useState<string>(folderName);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { pb } = usePocketbase();
  const folders = useFolders();
  const setFolders = useFoldersDispatch();

  const updateFolder = async (data: FolderDataType) => {
    if (error.length > 0) return;

    const prevFoldername = folderName;

    setIsLoading(true);
    setFolders((prev) => {
      const newList = prev.map((folder) => {
        if (folder.id !== folderId) return folder;

        return {
          ...folder,
          name: newName,
        };
      });

      return newList;
    });
    try {
      await pb.collection("folders").update(folderId, data);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error " + e.message);

        setFolders((prev) => {
          const newList = prev.map((folder) => {
            if (folder.id !== folderId) return folder;

            return {
              ...folder,
              name: prevFoldername,
            };
          });

          return newList;
        });
      }
    } finally {
      setNewName("");
      setIsEdit(false);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (newName.length === 0) {
      setError("Please input folder name");
      return;
    }

    if (newName === folderName) {
      setIsEdit(false);
      return;
    }

    updateFolder({ name: newName });
  };

  const handleBlur = () => {
    if (newName === folderName) {
      setIsEdit(false);
      return;
    }

    if (newName.length > 256) {
      setError("Folder name should not exceed 256 characters");
      return;
    }

    if (newName.length > 0) {
      updateFolder({ name: newName });
      return;
    }

    setIsEdit(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.currentTarget.value;

    setError("");
    setNewName(inputName);

    //check if input name contain "<" or ">"
    if (/[<>]/.test(inputName)) {
      setError("Folder name is not valid");
      return;
    }

    if (inputName.length > 256) {
      setError("Folder name should not exceed 256 characters");
      return;
    }

    if (inputName.length === 0) {
      setError("Please input folder name");
      return;
    }

    const foundFolder = folders.find((folder) => folder.name === inputName);
    if (foundFolder && foundFolder.id !== folderId) {
      setError("Folder name already exist");
      return;
    }
  };

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit}
      className="relative w-full border"
    >
      <input
        onInput={handleInput}
        onBlur={handleBlur}
        className={clsx(
          "input h-fit w-full rounded-none p-0 font-medium aria-[invalid=true]:input-error focus:border-none md:text-lg",
          { "opacity-70": isLoading },
        )}
        type="text"
        value={newName}
        autoFocus
        autoComplete="off"
        aria-invalid={error.length > 0}
      />

      <div className="input-error-message max-w-64 bg-white text-sm text-error">
        {error}
      </div>
    </form>
  );
};

export default EditFolder;

interface EditFolderPropsType {
  folderId: string;
  folderName: string;
  setIsEdit: SetStateType<boolean>;
}
