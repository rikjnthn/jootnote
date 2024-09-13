import React from "react";

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export interface ResetPasswordDataType {
  email: string;
  password: string;
  confirm_password: string;
}
