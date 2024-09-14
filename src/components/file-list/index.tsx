"use client";
import React from "react";

import File from "../file";
import { FileType } from "@/interface";

const FileList = ({ files, folderId }: FileListPropsType) => {
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
    </div>
  );
};

export default FileList;

interface FileListPropsType {
  files: FileType[];
  folderId: string;
}
