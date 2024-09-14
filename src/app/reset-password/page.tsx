"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import clsx from "clsx";
import { ClientResponseError } from "pocketbase";
import isEmail from "validator/lib/isEmail";
import { useForm } from "react-hook-form";

import { usePocketbase } from "@/context/pocketbase-context";
import TokenInput from "@/components/token-input";
import { ResetPasswordDataType } from "@/interface";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";

export default function Page() {
  const [isOpenToken, setIsOpenToken] = useState<boolean>(false);
  const [isResetPasswordError, setIsResetPasswordError] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordDataType>();

  const router = useRouter();
  const { pb } = usePocketbase();

  const resetPassword = async (data: ResetPasswordDataType) => {
    setIsResetPasswordError(false);
    try {
      await pb.collection("users").requestPasswordReset(data.email);

      setIsOpenToken(true);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error " + e.message);

        const errorResponse = e.response.data;

        setError("email", { message: errorResponse.email?.message });
        setError("password", { message: errorResponse.password?.message });
        setError("confirm_password", {
          message: errorResponse.confirmPassword?.message,
        });

        setIsOpenToken(false);
        setIsResetPasswordError(true);
      }
    }
  };

  const handleBack = () => {
    if (pb.authStore.isValid) {
      router.push("/");
      return;
    }

    router.push("/login");
  };

  return (
    <div>
      <div className={clsx({ hidden: isOpenToken })}>
        <div className="absolute grid h-full w-full place-items-center p-5">
          <div
            className={clsx(
              "flex w-full max-w-md flex-col items-center gap-16 rounded-md border p-10",
              isResetPasswordError ? "border-error" : "border-gray-light",
            )}
          >
            <div className="text-center text-3xl font-bold md:text-5xl">
              Reset Password
            </div>
            <form
              onSubmit={handleSubmit(resetPassword)}
              className="flex w-full flex-col gap-12"
            >
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                error={errors.email?.message?.toString()}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please input your account email",
                  },
                  validate: {
                    isValidEmail: (v) => {
                      if (!isEmail(v)) return "Email is not valid";
                    },
                  },
                })}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Password"
                error={errors.password?.message?.toString()}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please insert your password",
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
                      if (/\s+/.test(v))
                        return "Space character is not allowed";
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
                    message: "Please insert your password",
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

              {isResetPasswordError && (
                <div className="text-error">Failed to reset password</div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="max-md:text-sm, btn btn-primary rounded-md px-6 font-normal text-white"
                  type="button"
                >
                  Back
                </button>
                <SubmitButton name="Request" title="Request reset password" />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={clsx({ hidden: !isOpenToken })}>
        <TokenInput
          setResetPasswordError={setError}
          setIsResetPasswordError={setIsResetPasswordError}
          setIsOpenToken={setIsOpenToken}
          resetPasswordData={getValues()}
        />
      </div>
    </div>
  );
}
