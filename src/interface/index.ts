import React from "react";

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export interface ResetPasswordDataType {
  email: string;
  password: string;
  confirm_password: string;
}

export interface FolderType {
  id: string;
  name: string;
  files: FileType[];
}

export interface FolderDataType {
  name: string;
}

export interface FileType {
  id: string;
  name: string;
}
