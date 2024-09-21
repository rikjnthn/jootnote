"use client";
import { useState } from "react";
import clsx from "clsx";
import { ClientResponseError } from "pocketbase";

import { usePocketbase } from "@/context/pocketbase-context";
import ButtonWithTimer from "@/components/button-with-timer";
import { TWO_MINUTES_IN_SECONDS } from "@/constant";
import { SetStateType } from "@/interface";

export default function Page() {
  const [isError, setIsError] = useState<boolean>(false);

  const { pb } = usePocketbase();

  const requestEmail = async (setIsLoading: SetStateType<boolean>) => {
    try {
      await pb
        .collection("users")
        .requestVerification(pb.authStore.model?.email);

      setIsLoading(true);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error: " + e.message);

        setIsError(true);
      }
    }
  };

  return (
    <div className="absolute grid h-full w-full place-items-center p-5">
      <div
        className={clsx(
          "flex w-full max-w-lg flex-col items-center rounded-md border p-10",
          isError ? "border-error" : "border-gray-light",
        )}
      >
        <div className="text-center text-3xl font-bold md:text-4xl">
          Verify Your Account
        </div>

        <div className="mb-10 mt-4 text-center max-md:text-sm">
          We have send you a verification email. If you did not find the
          verification email, please check your spam folder.
        </div>

        <ButtonWithTimer
          clickFuntion={requestEmail}
          initialTime={TWO_MINUTES_IN_SECONDS}
          initialIsLoading
          title="Resent verification email"
        />
      </div>
    </div>
  );
}
