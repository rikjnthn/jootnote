"use client";
import Link from "next/link";

import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";

export default function Page() {
  return (
    <div className="absolute grid h-full w-full place-items-center p-5">
      <div className="border-gray-lighter flex w-full max-w-md flex-col items-center gap-16 border p-10">
        <div className="text-4xl font-bold md:text-6xl">Sign Up</div>
        <form className="flex w-full flex-col gap-12">
          <Input label="Email" type="email" placeholder="Email" />
          <Input label="Username" type="username" placeholder="Username" />
          <Input label="Password" type="password" placeholder="Password" />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
          />

          <div className="flex items-center justify-between">
            <div>
              <span>Already have an account? </span>
              <Link className="hover:underline" href="/login" prefetch={false}>
                Login
              </Link>
            </div>

            <SubmitButton name="Create" title="Create" />
          </div>
        </form>
      </div>
    </div>
  );
}
