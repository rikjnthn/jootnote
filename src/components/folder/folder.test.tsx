import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Folder from ".";
import { useFolders } from "@/context/folder-context";

function MockFile() {
  return <div>File</div>;
}

jest.mock("@/components/file", () => MockFile);

jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
    useSelectedLayoutSegments: jest.fn().mockReturnValue([]),
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

describe("Folder Component", () => {
  it("should render correctly", () => {
    const mockFolderName = "Folder_1";
    const mockFolderId = "folder_id_1";
    const mockFiles = [
      {
        id: "file_id_1",
        name: "file_name",
      },
    ];

    render(
      <Folder files={mockFiles} id={mockFolderId} name={mockFolderName} />,
    );

    const arrowIcon = screen.getByTitle("Open folder");
    expect(arrowIcon).toBeInTheDocument();

    const folderName = screen.getByText(mockFolderName);
    expect(folderName).toBeInTheDocument();

    const editIcon = screen.getByTitle("Edit");
    expect(editIcon).toBeInTheDocument();

    const deleteIcon = screen.getByTitle("Delete folder");
    expect(deleteIcon).toBeInTheDocument();

    const plusIcon = screen.getByTitle("Add file");
    expect(plusIcon).toBeInTheDocument();

    const fileList = screen.getByRole("list");
    expect(fileList).toBeInTheDocument();
  });

  it("should delete folder when user click delete icon", async () => {
    const mockFolderName = "Folder_1";
    const mockFolderId = "folder_id_1";
    const mockFiles = [
      {
        id: "file_id_1",
        name: "file_name",
      },
    ];

    render(
      <Folder files={mockFiles} id={mockFolderId} name={mockFolderName} />,
    );

    const deleteButton = screen.getByTitle("Delete folder");

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

    await userEvent.click(deleteButton);

    //mock delete folder
    (useFolders as jest.Mock).mockReturnValue([]);

    const mockFolders = useFolders();

    expect(mockFolders).toEqual([]);
  });

  it("should edit folder name", async () => {
    const mockFolderName = "Folder_1";
    const mockFolderId = "folder_id_1";
    const mockFiles = [
      {
        id: "file_id_1",
        name: "file_name",
      },
    ];

    const { container, rerender } = render(
      <Folder files={mockFiles} id={mockFolderId} name={mockFolderName} />,
    );

    const folderName = screen.getByText("Folder_1");
    expect(folderName).toBeInTheDocument();

    const editIcon = screen.getByTitle("Edit");
    await userEvent.click(editIcon);

    expect(screen.queryByTitle("Edit")).not.toBeInTheDocument();
    expect(screen.queryByTitle("Delete folder")).not.toBeInTheDocument();
    expect(screen.queryByTitle("Add file")).not.toBeInTheDocument();

    const editInput = screen.getByRole("textbox");
    const form = container.querySelector("form");

    await userEvent.clear(editInput);
    await userEvent.type(editInput, "new_folder_name");
    fireEvent.submit(form!);

    rerender(
      <Folder files={mockFiles} id={mockFolderId} name={"new_folder_name"} />,
    );

    const newFolderName = screen.getByText("new_folder_name");
    expect(newFolderName).toBeInTheDocument();
  });

  it("should open file input when plus icon is clicked", async () => {
    const mockFolderName = "Folder_1";
    const mockFolderId = "folder_id_1";
    const mockFiles = [
      {
        id: "file_id_1",
        name: "file_name",
      },
    ];

    render(
      <Folder files={mockFiles} id={mockFolderId} name={mockFolderName} />,
    );

    const plusIcon = screen.getByTitle("Add file");

    await userEvent.click(plusIcon);

    const addFileInput = screen.getByPlaceholderText("File name");
    expect(addFileInput).toBeInTheDocument();
  });

  it("should open file list when folder is open and close when click again", async () => {
    const mockFolderName = "Folder_1";
    const mockFolderId = "folder_id_1";
    const mockFiles = [
      {
        id: "file_id_1",
        name: "file_name",
      },
    ];

    render(
      <Folder files={mockFiles} id={mockFolderId} name={mockFolderName} />,
    );

    const folderWrapper = screen.getByTitle(mockFolderName);

    expect(
      screen.getByRole("list").parentElement?.classList.contains("hidden"),
    ).toBeFalsy();

    await userEvent.click(folderWrapper);

    expect(
      screen.getByRole("list").parentElement?.classList.contains("hidden"),
    ).toBeTruthy();

    await userEvent.click(folderWrapper);

    expect(
      screen.getByRole("list").parentElement?.classList.contains("hidden"),
    ).toBeFalsy();
  });
});
