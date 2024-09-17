"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ClientResponseError } from "pocketbase";
import clsx from "clsx";

import { usePocketbase } from "@/context/pocketbase-context";
import SubmitButton from "@/components/submit-button";
import Input from "@/components/input";

const LoginCard = () => {
  const [isLoginError, setIsLoginError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>();

  const router = useRouter();
  const { pb } = usePocketbase();

  const login = async (data: LoginDataType) => {
    setIsLoginError(false);
    try {
      await pb
        .collection("users")
        .authWithPassword(data.email_or_username, data.password);

      const authAsCookie = pb.authStore.exportToCookie({
        httpOnly: false,
      });
      document.cookie = authAsCookie;

      router.push("/");
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error " + e.message);

        setIsLoginError(true);
      }
    }
  };

  return (
    <div className="absolute grid h-full w-full place-items-center p-5">
      <div
        className={clsx(
          "flex w-full max-w-md flex-col items-center gap-16 rounded-md border p-10",
          isLoginError ? "border-error" : "border-gray-light",
        )}
      >
        <div className="text-3xl font-bold md:text-4xl">Login</div>
        <form
          onSubmit={handleSubmit(login)}
          className="flex w-full flex-col gap-12"
        >
          <Input
            label="Email or Username"
            type="text"
            placeholder="Email or username"
            error={errors.email_or_username?.message?.toString()}
            autoFocus
            {...register("email_or_username", {
              required: {
                value: true,
                message: "Please input your account email or username",
              },
              minLength: {
                value: 4,
                message: "Username should consist of 4 letters",
              },
              validate: {
                isNotContainSpace: (v) => {
                  if (/\s+/.test(v)) return "Space character is not allowed";
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
                  if (/\s+/.test(v)) return "Space character is not allowed";
                },
              },
            })}
          />

          {isLoginError && <div className="text-error">Failed to login</div>}

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 max-md:text-sm">
              <Link
                href="/reset-password"
                className="hover:underline max-md:underline"
                prefetch={false}
              >
                Forget password
              </Link>
              <Link
                className="hover:underline max-md:underline"
                href="/sign-up"
                prefetch={false}
              >
                Create Account
              </Link>
            </div>

            <SubmitButton name="Login" title="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;

interface LoginDataType {
  email_or_username: string;
  password: string;
}
