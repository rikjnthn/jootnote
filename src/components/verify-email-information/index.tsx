"use client";
import React from "react";

import { SetStateType } from "@/interface";
import { usePocketbase } from "@/context/pocketbase-context";

const VerifyEmailInformation = ({
  email,
  setIsVerifying,
}: VerifyEmailInformationPropsType) => {
  const { pb } = usePocketbase();

  const requestVerification = () => {
    pb.collection("users").requestVerification(email);
  };

  return (
    <div className="absolute grid h-full w-full place-items-center p-5">
      <div className="flex max-w-lg flex-col items-center rounded-md border border-gray-light p-10 text-center">
        <div className="w-fit text-3xl font-bold md:text-4xl">
          Verify Your Account
        </div>

        <div className="mb-10 mt-4 max-md:text-sm">
          We have send you a verification email. If you did not find the
          verification email, please check your spam folder.
        </div>

        <div className="flex items-center justify-center gap-10 max-xs:w-full max-xs:flex-col-reverse">
          <button
            onClick={() => setIsVerifying(false)}
            className="btn btn-primary font-normal max-xs:w-full md:text-base"
          >
            Back
          </button>

          <button
            onClick={requestVerification}
            className="btn btn-primary font-normal max-xs:w-full md:text-base"
          >
            Resend verification email
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailInformation;

interface VerifyEmailInformationPropsType {
  email: string;
  setIsVerifying: SetStateType<boolean>;
}
