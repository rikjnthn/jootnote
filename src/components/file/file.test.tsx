import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSelectedLayoutSegments } from "next/navigation";

import File from ".";
import { useFolders } from "@/context/folder-context";

jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
    useSelectedLayoutSegments: jest.fn(),
  };
});

jest.mock("@/context/pocketbase-context", () => {
  return {
    usePocketbase: jest.fn().mockReturnValue({
      pb: {
        authStore: {
          model: {
            id: "id",
          },
        },

        collection: jest.fn(),
      },
    }),
  };
});

jest.mock("@/context/folder-context", () => {
  return {
    useFolders: jest.fn().mockReturnValue([
      {
        name: "Folder_1",
        id: "folder_id_1",
        files: [
          {
            id: "file_id_1",
            name: "file_name",
          },
        ],
      },
    ]),
    useFoldersDispatch: jest.fn().mockReturnValue(jest.fn()),
  };
});

describe("File Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const mockFileId = "file_id_1";
    const mockFileName = "file_name";
    const mockFolderId = "folder_id_1";

    (useSelectedLayoutSegments as jest.Mock).mockReturnValue([]);

    const { container } = render(
      <File id={mockFileId} name={mockFileName} folderId={mockFolderId} />,
    );

    const fileWrapper = container.querySelector("div");
    expect(fileWrapper).toBeInTheDocument();

    const fileName = screen.getByText(mockFileName);
    expect(fileName).toBeInTheDocument();

    const editIcon = screen.getByTitle("Edit");
    expect(editIcon).toBeInTheDocument();

    const deleteIcon = screen.getByTitle("Delete file");
    expect(deleteIcon).toBeInTheDocument();
  });

  it("should open edit file input when click edit icon and edit file", async () => {
    const mockFileId = "file_id_1";
    const mockFileName = "file_name";
    const mockFolderId = "folder_id_1";

    (useSelectedLayoutSegments as jest.Mock).mockReturnValue([]);

    const { container, rerender } = render(
      <File id={mockFileId} name={mockFileName} folderId={mockFolderId} />,
    );

    const file = screen.getByText("file_name");
    expect(file).toBeInTheDocument();

    const editIcon = screen.getByTitle("Edit");

    await userEvent.click(editIcon);

    const editForm = container.querySelector("form");
    const editInput = screen.getByRole("textbox");

    await userEvent.clear(editInput);
    await userEvent.type(editInput, "new_file_name");
    fireEvent.submit(editForm!);

    rerender(
      <File id={mockFileId} name={"new_file_name"} folderId={mockFolderId} />,
    );

    const newName = screen.getByText("new_file_name");
    expect(newName).toBeInTheDocument();

    expect(editForm).not.toBeInTheDocument();
  });

  it("should delete file when delete icon clicked", async () => {
    const mockFileId = "file_id_1";
    const mockFileName = "file_name";
    const mockFolderId = "folder_id_1";

    (useSelectedLayoutSegments as jest.Mock).mockReturnValue([]);

    (useFolders as jest.Mock).mockReturnValueOnce([
      {
        name: "Folder_1",
        id: "folder_id_1",
        files: [
          {
            id: "file_id_1",
            name: "file_name",
          },
        ],
      },
    ]);

    render(
      <File id={mockFileId} name={mockFileName} folderId={mockFolderId} />,
    );

    const mockFoldersBeforeDelete = useFolders();
    expect(mockFoldersBeforeDelete).toEqual([
      {
        name: "Folder_1",
        id: "folder_id_1",
        files: [
          {
            id: "file_id_1",
            name: "file_name",
          },
        ],
      },
    ]);

    const deleteIcon = screen.getByTitle("Delete file");

    await userEvent.click(deleteIcon);

    //mock file delete after edit
    (useFolders as jest.Mock).mockReturnValueOnce([
      {
        name: "Folder_1",
        id: "folder_id_1",
        files: [],
      },
    ]);

    const mockFolders = useFolders();

    expect(mockFolders[0].files).toEqual([]);
  });

  it("should show background color when file is open", () => {
    const mockFileId = "file_id_1";
    const mockFileName = "file_name";
    const mockFolderId = "folder_id_1";

    (useSelectedLayoutSegments as jest.Mock).mockReturnValue([
      "notes",
      mockFileId,
    ]);

    const { container } = render(
      <File id={mockFileId} name={mockFileName} folderId={mockFolderId} />,
    );

    const fileWrapper = container.querySelector("div");

    expect(fileWrapper?.classList.contains("bg-neutral-300")).toBeTruthy();
  });
});
