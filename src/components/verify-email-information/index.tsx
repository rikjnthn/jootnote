"use client";
import React from "react";

import { SetStateType } from "@/interface";
import { usePocketbase } from "@/context/pocketbase-context";
import ButtonWithTimer from "../button-with-timer";
import { TWO_MINUTES_IN_SECONDS } from "@/constant";
import { ClientResponseError } from "pocketbase";

const VerifyEmailInformation = ({
  email,
  setIsVerifying,
}: VerifyEmailInformationPropsType) => {
  const { pb } = usePocketbase();

  const requestVerification = async (setIsLoading: SetStateType<boolean>) => {
    try {
      await pb.collection("users").requestVerification(email);

      setIsLoading(true);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error: " + e.message);
      }
    }
  };

  return (
    <div className="flex max-w-lg flex-col items-center rounded-md border border-gray-light p-10">
      <div className="w-fit text-center text-3xl font-bold md:text-4xl">
        Verify Your Account
      </div>

      <div className="mb-10 mt-4 text-center max-md:text-sm">
        We have send you a verification email. If you did not find the
        verification email, please check your spam folder.
      </div>

      <div className="flex items-center justify-center gap-10 max-xs:w-full max-xs:flex-col-reverse">
        <button
          onClick={() => setIsVerifying(false)}
          className="btn btn-primary font-normal max-xs:w-full md:text-base"
          type="button"
          title="Back"
        >
          Back
        </button>

        <ButtonWithTimer
          clickFuntion={requestVerification}
          title="Resent verification email"
          initialTime={TWO_MINUTES_IN_SECONDS}
          initialIsLoading
        />
      </div>
    </div>
  );
};

export default VerifyEmailInformation;

interface VerifyEmailInformationPropsType {
  email: string;
  setIsVerifying: SetStateType<boolean>;
}
