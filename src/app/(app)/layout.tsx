import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Pocketbase from "pocketbase";

import Header from "@/components/header";
import { NavigationProvider } from "@/context/navigation-context";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pb = new Pocketbase(process.env.API_URL);

  const cookie = cookies().toString();
  try {
    pb.authStore.loadFromCookie(cookie);
  } catch {
    redirect("/login");
  }

  if (!pb.authStore.isValid) {
    redirect("/login");
  }

  const authRecord = await pb
    .collection("users")
    .getOne(pb.authStore.model?.id)
    .catch(() => {
      redirect("/login");
    });

  if (!authRecord.verified) {
    await pb.collection("users").requestVerification(authRecord.email);

    redirect("/verify-email");
  }

  return (
    <NavigationProvider>
      <div className="hide-scrollbar relative flex h-full flex-col overflow-x-hidden md:flex">
        <Header />

        <div className="hide-scrollbar file-content-container ml-auto h-full">
          {children}
        </div>
      </div>
    </NavigationProvider>
  );
}
