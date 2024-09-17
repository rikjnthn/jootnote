import { cookies } from "next/headers";
import Pocketbase from "pocketbase";

import ContentInput from "@/components/content-input";
import TitleInput from "@/components/title-input";

const getFileContent = async (pb: Pocketbase, fileId: string) => {
  try {
    const record = await pb
      .collection("contents")
      .getFirstListItem<ContentType>(
        pb.filter("file.id = {:fileId}", { fileId }),
      );

    return record;
  } catch (e) {
    console.log(e);
  }
};

export default async function Page({ params }: { params: { fileId: string } }) {
  const pb = new Pocketbase(process.env.API_URL);
  pb.authStore.loadFromCookie(cookies().toString());

  const fileContent = await getFileContent(pb, params.fileId);

  return (
    <div className="flex h-full flex-col md:py-14 lg:px-20">
      <TitleInput
        contentId={fileContent?.id ?? ""}
        title={fileContent?.title}
      />

      <ContentInput
        contentId={fileContent?.id ?? ""}
        content={fileContent?.content}
      />
    </div>
  );
}

interface ContentType {
  id: string;
  title: string;
  content: string;
}
