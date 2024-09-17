"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ClientResponseError } from "pocketbase";
import clsx from "clsx";

import { usePocketbase } from "@/context/pocketbase-context";
import { useFolder } from "@/context/folder-context";
import Input from "../input";
import {
  FileType,
  FolderDataType,
  FolderType,
  SetStateType,
} from "@/interface";

const FolderInput = ({
  files,
  folderId,
  isInputFile,
  setIsInputFile,
}: FileInputPropsType) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { pb } = usePocketbase();
  const { setFolders } = useFolder();

  const createFile = async (data: FolderDataType) => {
    if (error.length > 0) return;

    setIsLoading(true);
    setIsInputFile(false);
    try {
      const record = await pb.collection("files").create<FileType>({
        name: data.name,
        folder: folderId,
      });

      await pb.collection("contents").create({
        file: record.id,
      });

      setFolders((prev) => {
        const newFolders = prev.map<FolderType>((folder) => {
          if (folder.id !== folderId) return folder;

          return {
            ...folder,
            files: [...folder.files, { id: record.id, name: record.name }],
          };
        });

        return newFolders;
      });
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error " + e.message);

        setError(e.response.data?.name?.message);
      }
    } finally {
      setName("");
      setIsLoading(false);
      setIsInputFile(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.length === 0) {
      setError("Please input folder name");
      return;
    }

    createFile({ name });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (isLoading) return;

    const inputName = e.currentTarget.value;

    setName(inputName);
    setError("");

    //check if input name contain "<" or ">"
    if (/[<>]/.test(inputName)) {
      setError("Folder name is not valid");
      return;
    }

    const foundFile = files.find((file) => file.name === inputName);

    if (foundFile) {
      setError("Folder name already exist");
    }
  };

  const handleOnBlur = async () => {
    if (isLoading) return;

    if (name.length === 0) {
      setIsInputFile(false);
      return;
    }

    createFile({ name });
  };

  return (
    <>
      <div className={clsx(isLoading ? "py-2.5 pl-8 opacity-50" : "hidden")}>
        <div className="flex items-center">
          <span className="line-clamp-1 font-medium md:text-lg">{name}</span>
        </div>
      </div>

      {isInputFile && !isLoading ? (
        <form onSubmit={handleSubmit} className="ml-2 pl-8">
          <Input
            onChange={handleInput}
            onBlur={handleOnBlur}
            label=""
            placeholder="File name"
            error={error}
            value={name}
            autoFocus
            autoComplete="off"
          />
        </form>
      ) : null}
    </>
  );
};

export default FolderInput;

interface FileInputPropsType {
  files: FileType[];
  folderId: string;
  isInputFile: boolean;
  setIsInputFile: SetStateType<boolean>;
}
