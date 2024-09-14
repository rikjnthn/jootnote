"use client";
import React from "react";

import File from "../file";
import { FileType, SetStateType } from "@/interface";
import FileInput from "../file-input";

const FileList = ({
  files,
  folderId,
  isInputFile,
  setIsInputFile,
}: FileListPropsType) => {
  return (
    <div>
      {files.map((file) => {
        return (
          <File
            key={file.id}
            id={file.id}
            name={file.name}
            folderId={folderId}
          />
        );
      })}

      <FileInput
        folderId={folderId}
        isInputFile={isInputFile}
        setIsInputFile={setIsInputFile}
      />
    </div>
  );
};

export default FileList;

interface FileListPropsType {
  files: FileType[];
  folderId: string;
  isInputFile: boolean;
  setIsInputFile: SetStateType<boolean>;
}
