import VerifyEmail from "@/components/verify-email";

export default function Page({ params }: { params: { token: string } }) {
  return <VerifyEmail token={params.token} />;
}
