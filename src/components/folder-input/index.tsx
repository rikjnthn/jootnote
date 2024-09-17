"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ClientResponseError } from "pocketbase";
import clsx from "clsx";

import { usePocketbase } from "@/context/pocketbase-context";
import Input from "../input";
import ArrowIcon from "../arrow-icon";
import { FolderDataType, FolderType, SetStateType } from "@/interface";
import { useFolder } from "@/context/folder-context";

const FolderInput = ({
  isInputFolder,
  setIsInputFolder,
}: FolderInputPropsType) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { pb } = usePocketbase();
  const { folders, setFolders } = useFolder();
  const userId = pb.authStore.model?.id;

  const createFolder = async (data: FolderDataType) => {
    if (error.length > 0) return;

    setIsLoading(true);
    setIsInputFolder(false);
    try {
      const record = await pb.collection("folders").create<FolderType>({
        name: data.name,
        user: userId,
      });

      setFolders((prev) => [
        ...prev,
        { id: record.id, name: record.name, files: [] },
      ]);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error " + e.message);

        setError(e.response.data?.name?.message);
      }
    } finally {
      setName("");
      setIsLoading(false);
      setIsInputFolder(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.length === 0) {
      setError("Please input folder name");
      return;
    }

    createFolder({ name });
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

    const foundFolder = folders.find((folder) => folder.name === inputName);
    if (foundFolder) {
      setError("Folder name already exist");
    }
  };

  const handleOnBlur = async () => {
    if (isLoading) return;

    if (name.length === 0) {
      setIsInputFolder(false);
      return;
    }

    createFolder({ name });
  };

  return (
    <>
      <div className={clsx(isLoading ? "py-2.5 opacity-50" : "hidden", "px-5")}>
        <div className="flex items-center">
          <ArrowIcon isOpen={false} />
          <span className="line-clamp-1 font-medium md:text-lg">{name}</span>
        </div>
      </div>

      {isInputFolder && !isLoading ? (
        <form onSubmit={handleSubmit} className="mx-5 ml-7">
          <Input
            onChange={handleInput}
            onBlur={handleOnBlur}
            label=""
            placeholder="Folder name"
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

interface FolderInputPropsType {
  isInputFolder: boolean;
  setIsInputFolder: SetStateType<boolean>;
}
