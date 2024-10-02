"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { ClientResponseError } from "pocketbase";

import Input from "../input";
import SubmitButton from "../submit-button";
import { usePocketbase } from "@/context/pocketbase-context";
import { useNavigation } from "@/context/navigation-context";

const UserDataSetting = () => {
  const { pb } = usePocketbase();

  const [username, setUsername] = useState<string>(
    pb.authStore.model?.username,
  );
  const [isUsernameChange, setIsUsernameChange] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const user = pb.authStore.model;

  const { isOpenSetting } = useNavigation();

  useEffect(() => {
    setUsername(pb.authStore.model?.username);
    setError("");
  }, [isOpenSetting, pb]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUsername = e.currentTarget.value;

    setUsername(inputUsername);
    setError("");

    setIsUsernameChange(user?.username !== inputUsername);

    if (inputUsername.length === 0) {
      setError("Please input your new username");
      return;
    }

    if (/\s+/.test(inputUsername)) {
      setError("Username should not contain space character");

      return;
    }

    if (inputUsername.length < 4) {
      setError("Username should consist of 4 letters");
      return;
    }

    if (inputUsername.length > 20) {
      setError("Username should not consist more than 20 letters");
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (error.length > 0) return;

    if (!isUsernameChange) return;

    setIsUsernameChange(false);
    try {
      const newUserData = await pb
        .collection("users")
        .update(user?.id, { username });

      pb.authStore.save(pb.authStore.token, newUserData);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error: " + e.message);
        setError(e.response.data.username);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "flex flex-col pt-4",
        error.length > 0 ? "gap-7" : "gap-4",
      )}
    >
      <Input
        onChange={handleInput}
        label="Username"
        name="username"
        type="text"
        error={error}
        value={username}
        placeholder="Username"
      />

      {isUsernameChange && <SubmitButton name="Change" title="Change" />}
    </form>
  );
};

export default UserDataSetting;
