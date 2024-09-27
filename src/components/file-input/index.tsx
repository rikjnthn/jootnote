"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ClientResponseError } from "pocketbase";
import clsx from "clsx";

import { usePocketbase } from "@/context/pocketbase-context";
import { useFoldersDispatch } from "@/context/folder-context";
import Input from "../input";
import {
  FileType,
  FolderDataType,
  FolderType,
  SetStateType,
} from "@/interface";

const FileInput = ({
  files,
  folderId,
  isInputFile,
  setIsInputFile,
}: FileInputPropsType) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { pb } = usePocketbase();
  const setFolders = useFoldersDispatch();

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

    if (inputName.length === 0) {
      setError("Please input file name");
      return;
    }

    //check if input name contain "<" or ">"
    if (/[<>]/.test(inputName)) {
      setError("File name is not valid");
      return;
    }

    if (inputName.length > 256) {
      setError("File name should not exceed 256 characters");
      return;
    }

    const foundFile = files.find((file) => file.name === inputName);

    if (foundFile) {
      setError("File name already exist");
    }
  };

  const handleOnBlur = async () => {
    if (isLoading) return;

    if (name.length === 0) {
      setIsInputFile(false);
      return;
    }

    if (name.length > 256) {
      setError("File name should not exceed 256 characters");
      return;
    }

    createFile({ name });
  };

  return (
    <>
      <div className={clsx(isLoading ? "py-2.5 pl-13 opacity-50" : "hidden")}>
        <div className="flex items-center">
          <span className="line-clamp-1 font-medium md:text-lg">{name}</span>
        </div>
      </div>

      {isInputFile && !isLoading ? (
        <form onSubmit={handleSubmit} className="ml-13 mr-5">
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

export default FileInput;

interface FileInputPropsType {
  files: FileType[];
  folderId: string;
  isInputFile: boolean;
  setIsInputFile: SetStateType<boolean>;
}
