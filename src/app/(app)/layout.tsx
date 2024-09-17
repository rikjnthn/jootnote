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
  } catch (e) {
    cookies().delete("pb_auth");
    redirect("/login");
  }

  if (!pb.authStore.isValid) {
    cookies().delete("pb_auth");
    redirect("/login");
  }

  await pb
    .collection("users")
    .getOne(pb.authStore.model?.id)
    .catch(() => {
      cookies().delete("pb_auth");
      redirect("/login");
    });

  return children;
}
