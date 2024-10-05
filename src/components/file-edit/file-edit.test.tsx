import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EditFile from ".";
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

describe("EditFile Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const mockFolderId = "folder_id_1";
    const mockFileName = "File_1";
    const mockSetIsEdit = jest.fn();
    const mockFileId = "file_id_1";

    const { container } = render(
      <EditFile
        folderId={mockFolderId}
        fileName={mockFileName}
        fileId={mockFileId}
        setIsEdit={mockSetIsEdit}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("value", mockFileName);

    const errorDiv = container.querySelector("div");
    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv).toHaveTextContent("");
  });

  it("should invoke setIsEdit when input is empty and user unfocus", async () => {
    const mockFolderId = "folder_id_1";
    const mockFileName = "File_1";
    const mockSetIsEdit = jest.fn();
    const mockFileId = "file_id_1";

    render(
      <EditFile
        folderId={mockFolderId}
        fileName={mockFileName}
        fileId={mockFileId}
        setIsEdit={mockSetIsEdit}
      />,
    );

    const input = screen.getByRole("textbox");

    await userEvent.clear(input);
    fireEvent.blur(input);

    expect(mockSetIsEdit).toHaveBeenCalled();
    expect(mockSetIsEdit).toHaveBeenCalledWith(false);
  });

  it("should set error and invalid state to input when user unfocus while input is invalid", async () => {
    const mockFolderId = "folder_id_1";
    const mockFileName = "File_1";
    const mockSetIsEdit = jest.fn();
    const mockFileId = "file_id_1";

    render(
      <EditFile
        folderId={mockFolderId}
        fileName={mockFileName}
        fileId={mockFileId}
        setIsEdit={mockSetIsEdit}
      />,
    );

    const input = screen.getByRole("textbox");

    await userEvent.clear(input);
    await userEvent.type(input, "r".repeat(257));
    fireEvent.blur(input);

    const errorTooLongName = screen.getByText(
      "File name should not exceed 256 characters",
    );
    expect(errorTooLongName).toBeInTheDocument();
  });

  it("should set error and invalid state to input when user input is invalid", async () => {
    const mockFolderId = "folder_id_1";
    const mockFileName = "File_1";
    const mockSetIsEdit = jest.fn();
    const mockFileId = "file_id_1";

    render(
      <EditFile
        folderId={mockFolderId}
        fileName={mockFileName}
        fileId={mockFileId}
        setIsEdit={mockSetIsEdit}
      />,
    );

    const input = screen.getByRole("textbox");

    await userEvent.clear(input);

    const errorEmptyValue = screen.getByText("Please input file name");
    expect(errorEmptyValue).toBeInTheDocument();

    //invalid folder name due to < or > character
    await userEvent.type(input, "invalid_file_<>");

    const errorInvalidName = screen.getByText("File name is not valid");
    expect(errorInvalidName).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, "r".repeat(257));

    const errorTooLongName = screen.getByText(
      "File name should not exceed 256 characters",
    );
    expect(errorTooLongName).toBeInTheDocument();

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

    await userEvent.clear(input);
    await userEvent.type(input, "File_2");

    const errorFileNameDuplicate = screen.getByText("File name already exist");
    expect(errorFileNameDuplicate).toBeInTheDocument();
  });

  it("should close edit input when new folder name is the same as old folder name", async () => {
    const mockFolderId = "folder_id_1";
    const mockFileName = "File_1";
    const mockSetIsEdit = jest.fn();
    const mockFileId = "file_id_1";

    const { container } = render(
      <EditFile
        folderId={mockFolderId}
        fileName={mockFileName}
        fileId={mockFileId}
        setIsEdit={mockSetIsEdit}
      />,
    );

    const form = container.querySelector("form");
    const input = screen.getByRole("textbox");

    await userEvent.clear(input);
    await userEvent.type(input, "File_1");
    fireEvent.submit(form!);

    expect(mockSetIsEdit).toHaveBeenCalled();
    expect(mockSetIsEdit).toHaveBeenCalledWith(false);
  });

  it("should update folder's file if no error", async () => {
    const mockFolderId = "folder_id_1";
    const mockFileName = "File_1";
    const mockSetIsEdit = jest.fn();
    const mockFileId = "file_id_1";

    const { container } = render(
      <EditFile
        folderId={mockFolderId}
        fileName={mockFileName}
        fileId={mockFileId}
        setIsEdit={mockSetIsEdit}
      />,
    );

    const mockFolders = [
      {
        id: mockFolderId,
        name: "Folder_1",
        files: [
          {
            id: "file_id_1",
            name: "File_1",
          },
        ],
      },
    ];

    expect(mockFolders[0]).toEqual({
      id: mockFolderId,
      name: "Folder_1",
      files: [
        {
          id: "file_id_1",
          name: "File_1",
        },
      ],
    });

    const form = container.querySelector("form");
    const input = screen.getByRole("textbox");

    await userEvent.clear(input);
    await userEvent.type(input, "new_File_1");
    fireEvent.submit(form!);

    //simulate folder updated
    mockFolders[0].files[0].name = "new_File_1";

    expect(mockFolders[0]).toEqual({
      id: mockFolderId,
      name: "Folder_1",
      files: [
        {
          id: "file_id_1",
          name: "new_File_1",
        },
      ],
    });
  });
});
