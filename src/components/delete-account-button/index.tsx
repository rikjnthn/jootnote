"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { usePocketbase } from "@/context/pocketbase-context";
import { ClientResponseError } from "pocketbase";

const DeleteAccountButton = () => {
  const router = useRouter();
  const { pb } = usePocketbase();

  const userId = pb.authStore.model?.id;

  const deleteAccount = async () => {
    try {
      await pb.collection("users").delete(userId);

      router.push("/login");

      document.cookie = "pb_auth=null; Expires=" + new Date(-1);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error: " + e.message);
      }
    }
  };
  return (
    <button
      onClick={deleteAccount}
      className="btn btn-error rounded-md p-6 py-2.5 font-normal text-white max-md:text-sm"
      title="Delete account"
      type="button"
    >
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;
