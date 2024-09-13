import React from "react";

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export interface ResetPasswordDataType {
  email: string;
  password: string;
  confirm_password: string;
}

export interface FolderType {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  name: string;
  users: string;
}
