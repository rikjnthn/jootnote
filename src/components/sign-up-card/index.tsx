"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import isEmail from "validator/es/lib/isEmail";
import { ClientResponseError } from "pocketbase";
import clsx from "clsx";

import { usePocketbase } from "@/context/pocketbase-context";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import VerifyEmailInformation from "../verify-email-information";

const SignUpCard = () => {
  const [isSignupError, setIsSignupError] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<SignUpDataType>();

  const { pb } = usePocketbase();

  const signUp = async (data: SignUpDataType) => {
    setIsSignupError(false);
    try {
      await pb.collection("users").create({
        username: data.username,
        email: data.email,
        password: data.password,
        passwordConfirm: data.confirm_password,
      });

      await pb.collection("users").requestVerification(data.email);
      setIsVerifying(true);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error: " + e.message);

        const errorResponse = e.response.data;

        setError("email", { message: errorResponse.email?.message });
        setError("username", { message: errorResponse.username?.message });
        setError("password", { message: errorResponse.password?.message });
        setError("confirm_password", {
          message: errorResponse.confirmPassword?.message,
        });

        setIsSignupError(true);
      }
    }
  };

  return (
    <div>
      <div className={clsx({ hidden: isVerifying })}>
        <div className="absolute grid h-full w-full place-items-center p-5">
          <div
            className={clsx(
              "flex w-full max-w-md flex-col items-center gap-16 rounded-md border p-10",
              isSignupError ? "border-error" : "border-gray-light",
            )}
          >
            <div className="text-3xl font-bold md:text-4xl">Sign Up</div>
            <form
              onSubmit={handleSubmit(signUp)}
              className="flex w-full flex-col gap-12"
            >
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                error={errors.email?.message?.toString()}
                autoFocus
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please insert your email address",
                  },
                  validate: {
                    isValidEmail: (v) => {
                      if (!isEmail(v)) return "Email is not valid";
                    },
                  },
                })}
              />
              <Input
                label="Username"
                type="text"
                placeholder="Username"
                error={errors.username?.message?.toString()}
                {...register("username", {
                  required: {
                    value: true,
                    message: "Please insert your username",
                  },
                  minLength: {
                    value: 4,
                    message: "Username should consist of 4 letters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username should not consist more than 20 letters",
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

              {isSignupError && (
                <div className="text-error">Failed to sign up</div>
              )}

              <div className="flex items-center justify-between">
                <div className="max-md:text-sm">
                  <span>Already have an account? </span>
                  <Link
                    className="hover:underline max-md:underline"
                    href="/login"
                    prefetch={false}
                  >
                    Login
                  </Link>
                </div>

                <SubmitButton name="Create" title="Create" />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={clsx({ hidden: !isVerifying })}>
        <VerifyEmailInformation
          email={getValues("email")}
          setIsVerifying={setIsVerifying}
        />
      </div>
    </div>
  );
};

export default SignUpCard;

interface SignUpDataType {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}
