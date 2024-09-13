"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { ClientResponseError } from "pocketbase";

import { usePocketbase } from "@/context/pocketbase-context";
import Input from "../input";
import SubmitButton from "../submit-button";
import { SetStateType } from "@/interface";
import BackIcon from "../back-icon";

const VerifyEmail = ({ setIsVerifying }: VerifyEmailPropsType) => {
  const [isVerifyError, setIsVerifyError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<TokenDataType>();

  const router = useRouter();
  const { pb } = usePocketbase();

  const verify = async (data: TokenDataType) => {
    setIsVerifyError(false);
    try {
      await pb.collection("users").confirmVerification(data.token);

      router.push("/");
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error " + e.message);

        const errorRequest = e.response.data;
        setError("token", { message: errorRequest.token?.message });

        setIsVerifyError(true);
      }
    }
  };

  const handleBack = () => {
    setIsVerifying(false);
    reset();
  };

  return (
    <div className="absolute grid h-full w-full place-items-center">
      <div
        className={clsx(
          "flex w-full max-w-md flex-col items-center gap-16 rounded-md border p-10",
          isVerifyError ? "border-error" : "border-gray-light",
        )}
      >
        <div className="flex w-full items-center">
          <div className="absolute flex">
            <BackIcon onClick={handleBack} />
          </div>
          <div className="mx-auto text-3xl font-bold md:text-5xl">
            Verify Email
          </div>
        </div>

        <form
          onSubmit={handleSubmit(verify)}
          className="flex w-full flex-col gap-12"
        >
          <Input
            label=""
            type="text"
            placeholder="token"
            error={errors.token?.message?.toString()}
            {...register("token", {
              required: {
                value: true,
                message: "Please insert your token",
              },
            })}
          />

          <SubmitButton name="Verify" title="Verify" />
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;

interface TokenDataType {
  token: string;
}

interface VerifyEmailPropsType {
  setIsVerifying: SetStateType<boolean>;
}
