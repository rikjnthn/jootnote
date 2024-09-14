import React, { FormEvent, useState } from "react";
import clsx from "clsx";

import { FolderDataType, SetStateType } from "@/interface";
import { useFolder } from "@/context/folder-context";
import { usePocketbase } from "@/context/pocketbase-context";
import { ClientResponseError } from "pocketbase";

const EditFolder = ({
  folderId,
  folderName,
  setIsEdit,
}: EditFolderPropsType) => {
  const [newName, setNewName] = useState<string>(folderName);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { pb } = usePocketbase();
  const { folders, setFolders } = useFolder();

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

    if (newName === folderName) {
      setIsEdit(false);
      return;
    }

    if (newName.length === 0) {
      setError("Please input folder name");
      return;
    }

    updateFolder({ name: newName });
  };

  const handleBlur = () => {
    if (newName === folderName) {
      setIsEdit(false);
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

    const foundFolder = folders.find((folder) => folder.name === inputName);
    if (foundFolder && foundFolder.id !== folderId) {
      setError("Folder name already exist");
      return;
    }

    if (inputName.length === 0) {
      setError("Please input folder name");
      return;
    }
  };

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit}
      className="relative w-full"
    >
      <input
        onInput={handleInput}
        onBlur={handleBlur}
        className={clsx(
          "input h-fit w-full rounded-none p-0 font-medium aria-[invalid=true]:input-error focus:border-none focus:outline-none md:text-lg",
          { "opacity-70": isLoading },
        )}
        value={newName}
        autoFocus
        autoComplete="off"
        aria-invalid={error.length > 0}
      />

      <div className="absolute top-7 max-w-64 bg-white text-sm text-error md:top-8">
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
