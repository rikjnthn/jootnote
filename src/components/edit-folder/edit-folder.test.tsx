import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EditFolder from ".";
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
    useFolders: jest
      .fn()
      .mockReturnValue([{ name: "Folder_1", id: "id_1", files: [] }]),
    useFoldersDispatch: jest.fn().mockReturnValue(jest.fn()),
  };
});

describe("EditFolder Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const mockFolderId = "folder_id";
    const mockFolderName = "Folder_1";
    const mockSetIsEdit = jest.fn();

    const { container } = render(
      <EditFolder
        folderId={mockFolderId}
        folderName={mockFolderName}
        setIsEdit={mockSetIsEdit}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("value", mockFolderName);

    const errorDiv = container.querySelector("div");
    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv).toHaveTextContent("");
  });

  it("should invoke setIsEdit when input is empty and user unfocus", async () => {
    const mockFolderId = "folder_id";
    const mockFolderName = "Folder_1";
    const mockSetIsEdit = jest.fn();

    render(
      <EditFolder
        folderId={mockFolderId}
        folderName={mockFolderName}
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
    const mockFolderId = "folder_id";
    const mockFolderName = "Folder_1";
    const mockSetIsEdit = jest.fn();

    render(
      <EditFolder
        folderId={mockFolderId}
        folderName={mockFolderName}
        setIsEdit={mockSetIsEdit}
      />,
    );

    const input = screen.getByRole("textbox");

    await userEvent.clear(input);
    await userEvent.type(input, "r".repeat(257));
    fireEvent.blur(input);

    const errorTooLongName = screen.getByText(
      "Folder name should not exceed 256 characters",
    );
    expect(errorTooLongName).toBeInTheDocument();
  });

  it("should set error and invalid state to input when user input is invalid", async () => {
    const mockFolderId = "folder_id";
    const mockFolderName = "Folder_1";
    const mockSetIsEdit = jest.fn();

    render(
      <EditFolder
        folderId={mockFolderId}
        folderName={mockFolderName}
        setIsEdit={mockSetIsEdit}
      />,
    );

    const input = screen.getByRole("textbox");

    await userEvent.clear(input);

    const errorEmptyValue = screen.getByText("Please input folder name");
    expect(errorEmptyValue).toBeInTheDocument();

    //invalid folder name due to < or > character
    await userEvent.type(input, "invalid_folder_<>");

    const errorInvalidName = screen.getByText("Folder name is not valid");
    expect(errorInvalidName).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, "r".repeat(257));

    const errorTooLongName = screen.getByText(
      "Folder name should not exceed 256 characters",
    );
    expect(errorTooLongName).toBeInTheDocument();

    (useFolders as jest.Mock).mockReturnValue([
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
    ]);

    await userEvent.clear(input);
    await userEvent.type(input, "Folder_2");

    const errorFolderDuplicate = screen.getByText("Folder name already exist");
    expect(errorFolderDuplicate).toBeInTheDocument();
  });

  it("should close edit input when new folder name is the same as old folder name", async () => {
    const mockFolderId = "folder_id";
    const mockFolderName = "Folder_1";
    const mockSetIsEdit = jest.fn();

    const { container } = render(
      <EditFolder
        folderId={mockFolderId}
        folderName={mockFolderName}
        setIsEdit={mockSetIsEdit}
      />,
    );

    const form = container.querySelector("form");
    const input = screen.getByRole("textbox");

    await userEvent.clear(input);
    await userEvent.type(input, "Folder_1");
    fireEvent.submit(form!);

    expect(mockSetIsEdit).toHaveBeenCalled();
    expect(mockSetIsEdit).toHaveBeenCalledWith(false);
  });

  it("should update folder if no error", async () => {
    const mockFolderId = "folder_id";
    const mockFolderName = "Folder_1";
    const mockSetIsEdit = jest.fn();

    const { container } = render(
      <EditFolder
        folderId={mockFolderId}
        folderName={mockFolderName}
        setIsEdit={mockSetIsEdit}
      />,
    );

    const mockFolders = [
      {
        id: mockFolderId,
        name: mockFolderName,
        files: [],
      },
    ];

    expect(mockFolders[0]).toEqual({
      id: mockFolderId,
      name: mockFolderName,
      files: [],
    });

    const form = container.querySelector("form");
    const input = screen.getByRole("textbox");

    await userEvent.clear(input);
    await userEvent.type(input, "new_Folder_1");
    fireEvent.submit(form!);

    //simulate folder updated
    mockFolders[0].name = "new_Folder_1";

    expect(mockFolders[0]).toEqual({
      id: mockFolderId,
      name: "new_Folder_1",
      files: [],
    });
  });
});
