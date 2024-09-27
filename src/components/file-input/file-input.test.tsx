import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FileInput from ".";
import { useFolders } from "@/context/folder-context";

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
            name: "File_1",
          },
        ],
      },
    ]),
    useFoldersDispatch: jest.fn().mockReturnValue(jest.fn()),
  };
});

describe("FileInput Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const mockFiles = [
      {
        id: "file_id_1",
        name: "File_1",
      },
    ];
    const mockFolderId = "folder_id_1";
    const mockIsInputFile = true;
    const mockSetIsInputFile = jest.fn();

    const { container } = render(
      <FileInput
        files={mockFiles}
        folderId={mockFolderId}
        isInputFile={mockIsInputFile}
        setIsInputFile={mockSetIsInputFile}
      />,
    );

    const filePlaceholder = container.querySelector("div");
    expect(filePlaceholder).toBeInTheDocument();
    expect(filePlaceholder?.classList.contains("hidden")).toBeTruthy();

    const input = screen.getByPlaceholderText("File name");
    expect(input).toBeInTheDocument();
  });

  it("should set error and invalid state to input when input is invalid", async () => {
    const mockFiles = [
      {
        id: "file_id_1",
        name: "File_1",
      },
    ];
    const mockFolderId = "folder_id_1";
    const mockIsInputFile = true;
    const mockSetIsInputFile = jest.fn();

    render(
      <FileInput
        files={mockFiles}
        folderId={mockFolderId}
        isInputFile={mockIsInputFile}
        setIsInputFile={mockSetIsInputFile}
      />,
    );

    const input = screen.getByPlaceholderText("File name");

    //type filename then clear it
    await userEvent.type(input, "dummy");
    await userEvent.clear(input);

    const errorEmptyInput = screen.getByText("Please input file name");
    expect(errorEmptyInput).toBeInTheDocument();

    await userEvent.type(input, "r".repeat(257));

    const errorTooLongName = screen.getByText(
      "File name should not exceed 256 characters",
    );
    expect(errorTooLongName).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, "File_<>"); //invalid file name

    const errorInvalidName = screen.getByText("File name is not valid");
    expect(errorInvalidName).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, "File_1");

    const errorFileNameDuplicate = screen.getByText("File name already exist");
    expect(errorFileNameDuplicate).toBeInTheDocument();
  });

  it("should set error and invalid state to input when input is invalid and user unfocus", async () => {
    const mockFiles = [
      {
        id: "file_id_1",
        name: "File_1",
      },
    ];
    const mockFolderId = "folder_id_1";
    const mockIsInputFile = true;
    const mockSetIsInputFile = jest.fn();

    render(
      <FileInput
        files={mockFiles}
        folderId={mockFolderId}
        isInputFile={mockIsInputFile}
        setIsInputFile={mockSetIsInputFile}
      />,
    );

    const input = screen.getByPlaceholderText("File name");

    await userEvent.type(input, "r".repeat(257));
    fireEvent.blur(input);

    const errorTooLongName = screen.getByText(
      "File name should not exceed 256 characters",
    );
    expect(errorTooLongName).toBeInTheDocument();
  });

  it("should close file input if input empty and user unfocus", async () => {
    const mockFiles = [
      {
        id: "file_id_1",
        name: "File_1",
      },
    ];
    const mockFolderId = "folder_id_1";
    const mockIsInputFile = true;
    const mockSetIsInputFile = jest.fn();

    render(
      <FileInput
        files={mockFiles}
        folderId={mockFolderId}
        isInputFile={mockIsInputFile}
        setIsInputFile={mockSetIsInputFile}
      />,
    );

    const input = screen.getByPlaceholderText("File name");

    await userEvent.clear(input);
    fireEvent.blur(input);

    expect(mockSetIsInputFile).toHaveBeenCalled();
    expect(mockSetIsInputFile).toHaveBeenCalledWith(false);
  });

  it("should create file if no error", async () => {
    const mockFiles = [
      {
        id: "file_id_1",
        name: "File_1",
      },
    ];
    const mockFolderId = "folder_id_1";
    const mockIsInputFile = true;
    const mockSetIsInputFile = jest.fn();

    const { container } = render(
      <FileInput
        files={mockFiles}
        folderId={mockFolderId}
        isInputFile={mockIsInputFile}
        setIsInputFile={mockSetIsInputFile}
      />,
    );

    const mockFoldersBeforeAddition = useFolders();

    expect(mockFoldersBeforeAddition).toEqual([
      {
        id: "folder_id_1",
        name: "Folder_1",
        files: [
          {
            id: "file_id_1",
            name: "File_1",
          },
        ],
      },
    ]);

    const form = container.querySelector("form");
    const input = screen.getByPlaceholderText("File name");

    await userEvent.clear(input);
    await userEvent.type(input, "File_2");
    fireEvent.submit(form!);

    //mock create file
    (useFolders as jest.Mock).mockReturnValue([
      {
        id: "folder_id_1",
        name: "Folder_1",
        files: [
          {
            id: "file_id_1",
            name: "File_1",
          },
          {
            id: "file_id_2",
            name: "File_2",
          },
        ],
      },
    ]);

    const mockFolders = useFolders();

    expect(mockFolders).toEqual([
      {
        id: "folder_id_1",
        name: "Folder_1",
        files: [
          {
            id: "file_id_1",
            name: "File_1",
          },
          {
            id: "file_id_2",
            name: "File_2",
          },
        ],
      },
    ]);
  });
});
