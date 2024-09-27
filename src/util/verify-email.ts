import Pocketbase, { ClientResponseError } from "pocketbase";

const verifyEmail = async (token: string, API_URL?: string) => {
  const pb = new Pocketbase(API_URL);

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

export default verifyEmail;
