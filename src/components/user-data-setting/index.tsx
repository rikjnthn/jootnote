"use client";
import React from "react";

import Input from "../input";
import SubmitButton from "../submit-button";
import { usePocketbase } from "@/context/pocketbase-context";

const UserDataSetting = () => {
  const { pb } = usePocketbase();

  const user = pb.authStore.model;

  return (
    <div>
      <span className="text-xl font-semibold md:text-2xl">User</span>
      <form className="flex flex-col gap-4 pt-4">
        <Input label="Username" type="text" defaultValue={user?.username} />

        <SubmitButton name="Change" title="Change" />
      </form>
    </div>
  );
};

export default UserDataSetting;
