"use client";
import { useState } from "react";
import clsx from "clsx";

import { usePocketbase } from "@/context/pocketbase-context";

export default function Page() {
  const [isRequestVerifyError, setIsRequestVerifyError] =
    useState<boolean>(false);

  const { pb } = usePocketbase();

  const requestEmail = async () => {
    try {
      await pb
        .collection("users")
        .requestVerification(pb.authStore.model?.email);
    } catch (e) {
      setIsRequestVerifyError(true);
    }
  };

  return (
    <div className="absolute grid h-full w-full place-items-center p-5">
      <div
        className={clsx(
          "flex w-full max-w-lg flex-col items-center rounded-md border p-10",
          isRequestVerifyError ? "border-error" : "border-gray-light",
        )}
      >
        <div className="text-center text-3xl font-bold md:text-4xl">
          Verify Your Account
        </div>

        <div className="mb-10 mt-4 text-center max-md:text-sm">
          We have send you a verification email. If you did not find the
          verification email, please check your spam folder.
        </div>

        <button
          onClick={requestEmail}
          className="btn btn-primary font-normal max-md:text-sm"
        >
          Resent Verification Email
        </button>
      </div>
    </div>
  );
}
