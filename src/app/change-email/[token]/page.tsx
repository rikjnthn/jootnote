"use client";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import { ClientResponseError } from "pocketbase";
import { useForm } from "react-hook-form";

import { usePocketbase } from "@/context/pocketbase-context";
import SubmitButton from "@/components/submit-button";
import Input from "@/components/input";

export default function Page({ params }: { params: { token: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(true);
    try {
      await pb
        .collection("users")
        .confirmEmailChange(params.token, data.password);

      setIsChange(true);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error: " + e.message);

        setIsError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className={clsx("absolute grid h-full w-full place-items-center p-5", {
          hidden: isChange,
        })}
      >
        <div
          className={clsx(
            "flex w-full max-w-md flex-col items-center gap-16 rounded-md border p-10",
            isError ? "border-error" : "border-gray-light",
          )}
        >
          <div className="text-center text-3xl font-bold md:text-4xl">
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

            <SubmitButton name="Change" title="Change" isLoading={isLoading} />
          </form>
        </div>
      </div>

      <div
        className={clsx("absolute grid h-full w-full place-items-center", {
          hidden: !isChange,
        })}
      >
        <div
          className={clsx(
            "flex w-full max-w-md flex-col items-center gap-16 rounded-md border p-10",
          )}
        >
          <div>
            <div className="text-center text-3xl font-bold md:text-4xl">
              Email Has Been Changed
            </div>

            <div className="mt-4 text-center">
              Your email has been changed. This action automatically logout your
              account.
            </div>
          </div>

          <Link href="/" className="btn btn-primary font-normal">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
