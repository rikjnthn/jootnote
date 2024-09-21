import { cookies } from "next/headers";
import Pocketbase, { ClientResponseError } from "pocketbase";

import FileContent from "@/components/file-content";

const getFileContent = async (pb: Pocketbase, fileId: string) => {
  try {
    const record = await pb
      .collection("contents")
      .getFirstListItem<ContentType>(
        pb.filter("file.id = {:fileId}", { fileId }),
      );

    return record;
  } catch (e) {
    if (e instanceof ClientResponseError) {
      console.log("Error: " + e.message);
    }
  }
};

export default async function Page({ params }: { params: { fileId: string } }) {
  const pb = new Pocketbase(process.env.API_URL);
  pb.authStore.loadFromCookie(cookies().toString());

  const fileContent = (await getFileContent(pb, params.fileId)) ?? {
    id: "",
    title: "",
    content: "",
  };

  return <FileContent fileContent={fileContent} />;
}

interface ContentType {
  id: string;
  title: string;
  content: string;
}
