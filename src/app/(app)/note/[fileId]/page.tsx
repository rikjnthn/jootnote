import { cookies } from "next/headers";
import Pocketbase from "pocketbase";

import FileContent from "@/components/file-content";
import getFileContent from "@/util/get-file-content";

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
