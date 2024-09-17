import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Pocketbase from "pocketbase";

import LoginCard from "@/components/login-card";

export default function Page() {
  const pb = new Pocketbase(process.env.API_URL);

  const cookie = cookies().toString();

  try {
    pb.authStore.loadFromCookie(cookie);
  } catch (e) {
    console.error(e);
  }

  if (pb.authStore.isValid) {
    redirect("/");
  }

  return <LoginCard />;
}
