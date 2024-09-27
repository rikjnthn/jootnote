import Pocketbase, { ClientResponseError, RecordModel } from "pocketbase";

import { FolderType, SetStateType } from "@/interface";

const getFolders = async (
  pb: Pocketbase,
  setFolders: SetStateType<FolderType[]>,
  setIsLoading: SetStateType<boolean>,
) => {
  setIsLoading(true);
  try {
    const userId = pb.authStore.model?.id;

    const records = await pb
      .collection("folders")
      .getFullList<FolderType & RecordModel>({
        filter: pb.filter("user.id = {:userId}", { userId }),
        expand: "files_via_folder",
      });

    const folders = records.map<FolderType>(({ id, name, expand }) => ({
      id,
      name,
      files: expand?.files_via_folder ?? [],
    }));

    setFolders(folders);
  } catch (e) {
    if (e instanceof ClientResponseError) {
      console.error("Error: " + e.message);
    }
  } finally {
    setIsLoading(false);
  }
};

export default getFolders;
