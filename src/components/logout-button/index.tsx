"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { usePocketbase } from "@/context/pocketbase-context";

const LogoutButton = () => {
  const router = useRouter();
  const { pb } = usePocketbase();

  const logout = () => {
    pb.authStore.clear();

    document.cookie = "pb_auth=null; Expires=" + new Date(-1);

    router.push("/login");
  };
  return (
    <button
      onClick={logout}
      className="btn btn-primary rounded-md p-6 py-2.5 font-normal text-white max-md:text-sm"
    >
      Log out
    </button>
  );
};

export default LogoutButton;
