"use client";
import Link from "next/link";
import React, { useState } from "react";
import clsx from "clsx";
import { ClientResponseError } from "pocketbase";
import { useForm } from "react-hook-form";

import { usePocketbase } from "@/context/pocketbase-context";
import { ResetPasswordDataType } from "@/interface";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";

export default function Page({ params }: { params: { token: string } }) {
  const [isReset, setIsReset] = useState<boolean>(false);
  const [isResetPasswordError, setIsResetPasswordError] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordDataType>();

  const { pb } = usePocketbase();

  const resetPassword = async (data: ResetPasswordDataType) => {
    setIsResetPasswordError(false);
    try {
      await pb
        .collection("users")
        .confirmPasswordReset(
          params.token,
          data.password,
          data.confirm_password,
        );

      setIsReset(true);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error " + e.message);

        const errorResponse = e.response.data;

        setError("password", { message: errorResponse.password?.message });
        setError("confirm_password", {
          message: errorResponse.confirmPassword?.message,
        });

        setIsReset(false);
        setIsResetPasswordError(true);
      }
    }
  };

  return (
    <div className="absolute grid h-full w-full place-items-center p-5">
      <div
        className={clsx(
          "flex w-full max-w-md flex-col items-center gap-16 rounded-md border p-10",
          isResetPasswordError ? "border-error" : "border-gray-light",
          { hidden: isReset },
        )}
      >
        <div className="text-center text-3xl font-bold md:text-4xl">
          Reset Password
        </div>
        <form
          onSubmit={handleSubmit(resetPassword)}
          className="flex w-full flex-col gap-12"
        >
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            error={errors.password?.message?.toString()}
            {...register("password", {
              required: {
                value: true,
                message: "Please input your password",
              },
              minLength: {
                value: 8,
                message: "Password should consist of 8 letters",
              },
              maxLength: {
                value: 64,
                message: "Password should not consist more than 64 letters",
              },
              validate: {
                isNotContainSpace: (v) => {
                  if (/\s+/.test(v)) return "Space character is not allowed";
                },
              },
            })}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            error={errors.confirm_password?.message?.toString()}
            {...register("confirm_password", {
              required: {
                value: true,
                message: "Please input your password",
              },
              validate: {
                isSameAsPassword: (v) => {
                  if (v !== getValues("password")) {
                    return "Confirm password is not the same as password";
                  }
                },
              },
            })}
          />

          <SubmitButton name="Reset" title="Reset" />
        </form>
      </div>

      <div
        className={clsx(
          "flex w-full max-w-md flex-col items-center gap-16 rounded-md border p-10",
          { hidden: !isReset },
        )}
      >
        <div>
          <div className="text-center text-3xl font-bold md:text-4xl">
            Password Reset
          </div>

          <div className="mt-4 text-center">Your password has been reset.</div>
        </div>

        <Link href="/login" className="btn btn-primary font-normal">
          Login now
        </Link>
      </div>
    </div>
  );
}
