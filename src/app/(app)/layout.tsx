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

  return children;
}
