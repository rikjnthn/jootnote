"use client";
import clsx from "clsx";

import SubmitButton from "@/components/submit-button";
import Input from "@/components/input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { usePocketbase } from "@/context/pocketbase-context";

export default function Page({ params }: { params: { token: string } }) {
  const [isChange, setIsChange] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ password: string }>();

  const { pb } = usePocketbase();

  const changeEmail = async (data: { password: string }) => {
    setIsError(false);
    try {
      await pb
        .collection("users")
        .confirmEmailChange(params.token, data.password);

      setIsChange(true);
    } catch (e) {
      setIsError(true);
    }
  };

  return (
    <div>
      <div className={clsx({ hidden: isChange })}>
        <div className="absolute grid h-full w-full place-items-center p-5">
          <div
            className={clsx(
              "flex w-full max-w-md flex-col items-center gap-16 rounded-md border p-10",
              isError ? "border-error" : "border-gray-light",
            )}
          >
            <div className="text-center text-3xl font-bold md:text-5xl">
              Confirm Email Change
            </div>
            <form
              onSubmit={handleSubmit(changeEmail)}
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

              <SubmitButton name="Change" title="Change" />
            </form>
          </div>
        </div>
      </div>

      <div className={clsx({ hidden: !isChange })}>
        <div className="absolute grid h-full w-full place-items-center">
          <div
            className={clsx(
              "flex w-full max-w-md flex-col items-center gap-16 rounded-md border p-10",
            )}
          >
            <div className="text-center">
              <div className="text-center text-3xl font-bold md:text-5xl">
                Email Has Been Changed
              </div>

              <div className="mt-4">
                Your Email has been changed. This action automatically logout
                your account.
              </div>
            </div>

            <Link href="/" className="btn btn-primary font-normal">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
