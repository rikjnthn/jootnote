"use client";
import Link from "next/link";

import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";

export default function Page() {
  return (
    <div className="absolute grid h-full w-full place-items-center p-5">
      <div className="border-gray-lighter flex w-full max-w-md flex-col items-center gap-16 border p-10">
        <div className="text-4xl font-bold md:text-6xl">Login</div>
        <form className="flex w-full flex-col gap-12">
          <Input
            label="Email or Username"
            type="text"
            placeholder="Email or username"
          />
          <Input label="Password" type="password" placeholder="Password" />

          <div className="flex items-center justify-between">
            <Link className="hover:underline" href="/sign-up" prefetch={false}>
              Create Account
            </Link>

            <SubmitButton name="Login" title="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}
