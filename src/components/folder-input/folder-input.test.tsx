import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useFolders } from "@/context/folder-context";
import FolderInput from ".";

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
        files: [],
      },
    ]),
    useFoldersDispatch: jest.fn().mockReturnValue(jest.fn()),
  };
});

describe("FolderInput Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const mockIsInputFolder = true;
    const mockSetIsInputFolder = jest.fn();

    const { container } = render(
      <FolderInput
        isInputFolder={mockIsInputFolder}
        setIsInputFolder={mockSetIsInputFolder}
      />,
    );

    const folderPlaceholder = container.querySelector("div");
    expect(folderPlaceholder).toBeInTheDocument();
    expect(folderPlaceholder?.classList.contains("hidden")).toBeTruthy();

    const input = screen.getByPlaceholderText("Folder name");
    expect(input).toBeInTheDocument();
  });

  it("should set error and invalid state to input when input is invalid", async () => {
    const mockIsInputFolder = true;
    const mockSetIsInputFolder = jest.fn();

    render(
      <FolderInput
        isInputFolder={mockIsInputFolder}
        setIsInputFolder={mockSetIsInputFolder}
      />,
    );

    const input = screen.getByPlaceholderText("Folder name");

    //type folder name then clear it
    await userEvent.type(input, "dummy");
    await userEvent.clear(input);

    const errorEmptyInput = screen.getByText("Please input folder name");
    expect(errorEmptyInput).toBeInTheDocument();

    await userEvent.type(input, "r".repeat(257));

    const errorTooLongName = screen.getByText(
      "Folder name should not exceed 256 characters",
    );
    expect(errorTooLongName).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, "Folder_<>"); //invalid folder name

    const errorInvalidName = screen.getByText("Folder name is not valid");
    expect(errorInvalidName).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, "Folder_1");

    const errorFolderNameDuplicate = screen.getByText(
      "Folder name already exist",
    );
    expect(errorFolderNameDuplicate).toBeInTheDocument();
  });

  it("should set error and invalid state to input when input is invalid and user unfocus", async () => {
    const mockIsInputFolder = true;
    const mockSetIsInputFolder = jest.fn();

    render(
      <FolderInput
        isInputFolder={mockIsInputFolder}
        setIsInputFolder={mockSetIsInputFolder}
      />,
    );

    const input = screen.getByPlaceholderText("Folder name");

    await userEvent.type(input, "r".repeat(257));
    fireEvent.blur(input);

    const errorTooLongName = screen.getByText(
      "Folder name should not exceed 256 characters",
    );
    expect(errorTooLongName).toBeInTheDocument();
  });

  it("should close folder input if input empty and user unfocus", async () => {
    const mockIsInputFolder = true;
    const mockSetIsInputFolder = jest.fn();

    render(
      <FolderInput
        isInputFolder={mockIsInputFolder}
        setIsInputFolder={mockSetIsInputFolder}
      />,
    );

    const input = screen.getByPlaceholderText("Folder name");

    await userEvent.clear(input);
    fireEvent.blur(input);

    expect(mockSetIsInputFolder).toHaveBeenCalled();
    expect(mockSetIsInputFolder).toHaveBeenCalledWith(false);
  });

  it("should create folder if no error", async () => {
    const mockIsInputFolder = true;
    const mockSetIsInputFolder = jest.fn();

    const { container } = render(
      <FolderInput
        isInputFolder={mockIsInputFolder}
        setIsInputFolder={mockSetIsInputFolder}
      />,
    );

    const mockFoldersBeforeAddition = useFolders();

    expect(mockFoldersBeforeAddition).toEqual([
      {
        id: "folder_id_1",
        name: "Folder_1",
        files: [],
      },
    ]);

    const form = container.querySelector("form");
    const input = screen.getByPlaceholderText("Folder name");

    await userEvent.clear(input);
    await userEvent.type(input, "Folder_2");
    fireEvent.submit(form!);

    //mock create folder
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

    const mockFolders = useFolders();

    expect(mockFolders).toEqual([
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
  });
});
