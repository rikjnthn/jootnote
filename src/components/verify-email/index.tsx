import Link from "next/link";
import Pocketbase, { ClientResponseError } from "pocketbase";

const verify = async (token: string) => {
  const pb = new Pocketbase(process.env.API_URL);

  try {
    const isVerified = await pb.collection("users").confirmVerification(token);

    return isVerified;
  } catch (e) {
    if (e instanceof ClientResponseError) {
      console.error("Error " + e.message);
    }

    return false;
  }
};

const VerifyEmail = async ({ token }: VerifyEmailPropsType) => {
  const isVerified = await verify(token);

  if (!isVerified) {
    return (
      <div>
        <div className="absolute grid h-full w-full place-items-center">
          <div className="flex flex-col items-center">
            <div className="px-10 text-center">
              <div className="mx-auto text-3xl font-bold md:text-5xl">
                Token Is Invalid
              </div>

              <div className="mt-4 max-md:text-sm">
                Your token is invalid or may be expired.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute grid h-full w-full place-items-center">
      <div className="flex flex-col items-center">
        <div className="px-10 text-center">
          <div className="mx-auto text-3xl font-bold md:text-5xl">
            Account Verified
          </div>

          <div className="mt-4 max-md:text-sm">
            Your account has been verified. Thank you for using this app.
          </div>
        </div>

        <Link
          className="btn btn-primary mt-20 w-fit font-normal"
          href="/"
          prefetch={false}
        >
          Go to the app
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;

interface VerifyEmailPropsType {
  token: string;
}
