import { render, screen } from "@testing-library/react";

import FileList from ".";

function MockFileInput() {
  return <div>File input</div>;
}

function MockFile() {
  return <div>File</div>;
}

jest.mock("@/components/file-input", () => MockFileInput);
jest.mock("@/components/file", () => MockFile);

describe("FileList Component", () => {
  it("should render correctly", () => {
    const mockFiles = [
      {
        id: "file_id_1",
        name: "File_1",
      },
      {
        id: "file_id_2",
        name: "File_2",
      },
      {
        id: "file_id_3",
        name: "File_3",
      },
    ];
    const mockIsInputFile = false;
    const mockFolderId = "folder_id_1";
    const mockSetIsInputFile = jest.fn();

    render(
      <FileList
        files={mockFiles}
        folderId={mockFolderId}
        isInputFile={mockIsInputFile}
        setIsInputFile={mockSetIsInputFile}
      />,
    );

    const fileInput = screen.getByText("File input");
    expect(fileInput).toBeInTheDocument();

    const files = screen.getAllByText("File");
    expect(files.length).toBe(3);
    files.forEach((file) => {
      expect(file).toBeInTheDocument();
    });
  });
});
