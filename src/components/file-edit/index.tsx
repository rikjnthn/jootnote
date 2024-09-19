import React, { FormEvent, useState } from "react";
import clsx from "clsx";

import { FolderDataType, SetStateType } from "@/interface";
import { useFolder } from "@/context/folder-context";
import { usePocketbase } from "@/context/pocketbase-context";
import { ClientResponseError } from "pocketbase";

const EditFile = ({
  fileId,
  folderId,
  fileName,
  setIsEdit,
}: EditFilePropsType) => {
  const [newName, setNewName] = useState<string>(fileName);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { pb } = usePocketbase();
  const { folders, setFolders } = useFolder();

  const updateFolder = async (data: FolderDataType) => {
    if (error.length > 0) return;

    const prevFilename = fileName;

    setIsLoading(true);
    setFolders((prev) => {
      const newList = prev.map((folder) => {
        if (folder.id !== folderId) return folder;

        return {
          ...folder,
          files: folder.files.map((file) => {
            if (file.id !== fileId) return file;

            return {
              ...file,
              name: newName,
            };
          }),
        };
      });

      return newList;
    });
    try {
      await pb.collection("files").update(fileId, data);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error " + e.message);

        setFolders((prev) => {
          const newList = prev.map((folder) => {
            if (folder.id !== folderId) return folder;

            return {
              ...folder,
              files: folder.files.map((file) => {
                return {
                  ...file,
                  name: prevFilename,
                };
              }),
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

    if (newName === fileName) {
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
    if (newName === fileName) {
      setIsEdit(false);
      return;
    }

    if (newName.length > 256) {
      setError("File name should not exceed 256 characters");
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

    if (inputName.length === 0) {
      setError("Please input file name");
      return;
    }

    if (inputName.length > 256) {
      setError("File name should not exceed 256 characters");
      return;
    }

    //check if input name contain "<" or ">"
    if (/[<>]/.test(inputName)) {
      setError("File name is not valid");
      return;
    }

    folders.forEach((folder) => {
      if (folder.id !== folderId) return;

      const foundFile = folder.files.find((file) => file.name === inputName);

      if (foundFile && foundFile.id !== fileId) {
        setError("File name already exist");
        return;
      }
    });
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
          "input h-fit w-full rounded-none px-0 py-1 font-medium aria-[invalid=true]:input-error focus:border-none md:text-lg",
          { "opacity-70": isLoading },
        )}
        type="text"
        value={newName}
        autoFocus
        autoComplete="off"
        aria-invalid={error.length > 0}
      />

      <div className="input-error-message bg-white text-sm text-error">
        {error}
      </div>
    </form>
  );
};

export default EditFile;

interface EditFilePropsType {
  fileId: string;
  folderId: string;
  fileName: string;
  setIsEdit: SetStateType<boolean>;
}
