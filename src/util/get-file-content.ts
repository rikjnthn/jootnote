import Pocketbase, { ClientResponseError } from "pocketbase";

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
      console.error("Error: " + e.message);
    }
  }
};

export default getFileContent;

interface ContentType {
  id: string;
  title: string;
  content: string;
}
