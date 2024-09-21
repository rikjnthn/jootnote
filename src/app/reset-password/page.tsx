"use client";
import { useState } from "react";
import clsx from "clsx";
import isEmail from "validator/lib/isEmail";
import { ClientResponseError } from "pocketbase";
import { useForm } from "react-hook-form";

import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { usePocketbase } from "@/context/pocketbase-context";
import ButtonWithTimer from "@/components/button-with-timer";
import { TWO_MINUTES_IN_SECONDS } from "@/constant";

export default function Page() {
  const [isRequestError, setIsRequestError] = useState<boolean>(false);
  const [isRequested, setIsRequested] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<{ email: string }>();

  const { pb } = usePocketbase();

  const requestReset = async (data: { email: string }) => {
    setIsRequestError(false);
    try {
      await pb.collection("users").requestPasswordReset(data.email);

      setIsRequested(true);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error: " + e.message);

        setIsRequestError(true);

        setError("email", { message: e.response.data.email });
      }
    }
  };

  return (
    <div className="absolute grid h-full w-full place-items-center">
      <div className={clsx({ hidden: isRequested })}>
        <div
          className={clsx(
            "flex w-full max-w-md flex-col items-center gap-16 rounded-md border p-10",
            isRequestError ? "border-error" : "border-gray-light",
          )}
        >
          <div className="text-center text-3xl font-bold md:text-4xl">
            Request Reset Password
          </div>

          <form
            onSubmit={handleSubmit(requestReset)}
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

            <SubmitButton name="Request" title="Request" />
          </form>
        </div>
      </div>

      <div className={clsx({ hidden: !isRequested })}>
        <div
          className={clsx(
            "flex w-full max-w-md flex-col items-center gap-16 rounded-md border p-10",
            isRequestError ? "border-error" : "border-gray-light",
          )}
        >
          <div>
            <div className="text-center text-3xl font-bold md:text-4xl">
              Reset Password Requested
            </div>

            <div className="mt-4 text-center">
              Your reset password request has been sent. If you did not find the
              reset password email, please check your spam folder.
            </div>
          </div>

          <div className="flex items-center justify-center gap-10 max-xs:w-full max-xs:flex-col-reverse">
            <button
              onClick={() => setIsRequested(false)}
              className="btn btn-primary font-normal max-xs:w-full md:text-base"
              type="button"
              title="Back"
            >
              Back
            </button>

            <ButtonWithTimer
              clickFuntion={async (setIsLoading) => {
                await requestReset({ email: getValues("email") });

                setIsLoading(true);
              }}
              title="Resend reset password email"
              initialTime={TWO_MINUTES_IN_SECONDS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
