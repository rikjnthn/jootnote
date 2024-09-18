import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Pocketbase from "pocketbase";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pb = new Pocketbase(process.env.API_URL);

  const cookie = cookies().toString();
  try {
    pb.authStore.loadFromCookie(cookie);

    if (!pb.authStore.isValid) {
      throw new Error("Unauthorized");
    }

    await pb.collection("users").getOne(pb.authStore.model?.id);
  } catch (e) {
    redirect("/login");
  }

  return children;
}
