"use client";
import React, { useEffect, useState } from "react";
import isEmail from "validator/lib/isEmail";
import clsx from "clsx";
import { ClientResponseError } from "pocketbase";

import Input from "../input";
import SubmitButton from "../submit-button";
import { usePocketbase } from "@/context/pocketbase-context";
import { useNavigation } from "@/context/navigation-context";

const ChangeEmailSetting = () => {
  const { pb } = usePocketbase();

  const [email, setEmail] = useState<string>(pb.authStore.model?.email);
  const [isEmailChange, setIsEmailChange] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const user = pb.authStore.model;

  const { isOpenSetting } = useNavigation();

  useEffect(() => {
    setEmail(pb.authStore.model?.email);
    setError("");
  }, [isOpenSetting, pb]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.currentTarget.value;

    setEmail(inputEmail);
    setError("");

    setIsEmailChange(user?.email !== inputEmail);

    if (inputEmail.length === 0) {
      setError("Please input your email");
      return;
    }

    if (!isEmail(inputEmail)) {
      setError("Email is not valid");
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (error.length > 0) return;

    if (!isEmailChange) return;

    setIsEmailChange(false);
    try {
      await pb.collection("users").requestEmailChange(email);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.log("Error: " + e.message);

        setError(e.response.data.newEmail.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("flex flex-col", error.length > 0 ? "gap-7" : "gap-4")}
    >
      <Input
        onChange={handleInput}
        type="email"
        name="email"
        error={error}
        label="Email"
        value={email}
        placeholder="Email"
      />

      {isEmailChange && <SubmitButton name="Change" title="Change" />}
    </form>
  );
};

export default ChangeEmailSetting;
