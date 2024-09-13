"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { useForm, UseFormSetError } from "react-hook-form";
import { ClientResponseError } from "pocketbase";

import { usePocketbase } from "@/context/pocketbase-context";
import { ResetPasswordDataType, SetStateType } from "@/interface";
import Input from "../input";
import SubmitButton from "../submit-button";
import BackIcon from "../back-icon";

const TokenInput = ({
  setIsOpenToken,
  resetPasswordData,
  setIsResetPasswordError,
  setResetPasswordError,
}: TokenInputPropsType) => {
  const [isTokenError, setIsTokenError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<TokenDataType>();

  const { pb } = usePocketbase();

  const handleTokenInput = async (data: TokenDataType) => {
    setIsTokenError(false);
    try {
      const record = await pb
        .collection("users")
        .confirmPasswordReset(
          data.token,
          resetPasswordData.password,
          resetPasswordData.confirm_password,
        );

      console.log(record);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error " + e.message);

        const errorRequest = e.response.data;

        if (errorRequest.password || errorRequest.confirm_password) {
          setIsOpenToken(false);
          setIsResetPasswordError(true);

          setResetPasswordError("password", {
            message: errorRequest.password?.message,
          });
          setResetPasswordError("confirm_password", {
            message: errorRequest.confirmPassword?.message,
          });

          return;
        }

        setError("token", { message: errorRequest.token?.message });

        setIsTokenError(true);
      }
    }
  };

  const handleBack = () => {
    setIsOpenToken(false);
    reset();
  };

  return (
    <div className="absolute grid h-full w-full place-items-center p-5">
      <div
        className={clsx(
          "flex w-full max-w-md flex-col items-center gap-16 rounded-md border p-10",
          isTokenError ? "border-error" : "border-gray-light",
        )}
      >
        <div className="flex w-full items-center">
          <div className="absolute flex">
            <BackIcon onClick={handleBack} />
          </div>
          <div className="mx-auto text-3xl font-bold md:text-5xl">
            Input Token
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleTokenInput)}
          className="flex w-full flex-col gap-12"
        >
          <Input
            label=""
            type="text"
            placeholder="Token"
            error={errors.token?.message?.toString()}
            {...register("token", {
              required: {
                value: true,
                message: "Please input your account token",
              },
            })}
          />

          <SubmitButton name="Reset Password" title="Reset password" />
        </form>
      </div>
    </div>
  );
};

export default TokenInput;

interface TokenDataType {
  token: string;
}

interface TokenInputPropsType {
  setIsOpenToken: SetStateType<boolean>;
  resetPasswordData: ResetPasswordDataType;
  setIsResetPasswordError: SetStateType<boolean>;
  setResetPasswordError: UseFormSetError<ResetPasswordDataType>;
}
