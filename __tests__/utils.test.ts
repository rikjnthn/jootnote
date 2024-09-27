import { usePocketbase } from "@/context/pocketbase-context";
import getFileContent from "@/util/get-file-content";
import getFolders from "@/util/get-folders";
import verifyEmail from "@/util/verify-email";

jest.mock("@/context/pocketbase-context", () => {
  return {
    usePocketbase: jest.fn().mockReturnValue({
      pb: {},
    }),
  };
});

jest.mock("@/util/get-file-content");
jest.mock("@/util/verify-email");
jest.mock("@/util/get-folders");

describe("Test Utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get file content", async () => {
    (getFileContent as jest.Mock).mockResolvedValue({
      id: "content_id",
      title: "title",
      content: "content",
    });

    const { pb } = usePocketbase();

    const fileContent = getFileContent(pb, "file_id_1");

    await expect(fileContent).resolves.toEqual({
      id: "content_id",
      title: "title",
      content: "content",
    });
  });

  it("should verify email", async () => {
    (verifyEmail as jest.Mock)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false)
      .mockRejectedValueOnce(false);

    await expect(verifyEmail("token", "API_URL")).resolves.toBeTruthy();

    await expect(verifyEmail("invalid_token", "API_URL")).resolves.toBeFalsy();

    await expect(verifyEmail("token", "API_URL")).rejects.toBeFalsy();
  });

  it("should get folders", async () => {
    (getFolders as jest.Mock).mockResolvedValueOnce([
      {
        id: "folder_id",
        name: "Folder",
        files: [
          {
            id: "file_id",
            name: "File",
          },
        ],
      },
    ]);

    const { pb } = usePocketbase();
    const mockSetFolders = jest.fn();
    const mockSetIsLoading = jest.fn();

    await expect(
      getFolders(pb, mockSetFolders, mockSetIsLoading),
    ).resolves.toEqual([
      {
        id: "folder_id",
        name: "Folder",
        files: [
          {
            id: "file_id",
            name: "File",
          },
        ],
      },
    ]);
  });
});
