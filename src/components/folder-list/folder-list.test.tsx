import { render, screen } from "@testing-library/react";

import FolderList from ".";

function MockFolderInput() {
  return <div>Folder input</div>;
}

function MockFolder() {
  return <div>Folder</div>;
}

jest.mock("@/components/folder-input", () => MockFolderInput);
jest.mock("@/components/folder", () => MockFolder);

jest.mock("@/context/folder-context", () => {
  return {
    useFolders: jest.fn().mockReturnValue([
      {
        id: "folder_id_1",
        name: "Folder_1",
        files: [],
      },
      {
        id: "folder_id_2",
        name: "Folder_2",
        files: [],
      },
      {
        id: "folder_id_3",
        name: "Folder_3",
        files: [],
      },
    ]),
  };
});

describe("FolderList Component", () => {
  it("should render correctly", () => {
    const mockIsInputFolder = false;
    const mockSetIsInputFolder = jest.fn();

    render(
      <FolderList
        isInputFolder={mockIsInputFolder}
        setIsInputFolder={mockSetIsInputFolder}
      />,
    );

    const folderInput = screen.getByText("Folder input");
    expect(folderInput).toBeInTheDocument();

    const folders = screen.getAllByText("Folder");
    expect(folders.length).toBe(3);
    folders.forEach((folder) => {
      expect(folder).toBeInTheDocument();
    });
  });
});
