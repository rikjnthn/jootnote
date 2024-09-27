import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FileContent from ".";

jest.mock("@/context/pocketbase-context", () => {
  return {
    usePocketbase: jest.fn().mockReturnValue({
      pb: {
        collection: jest.fn().mockReturnValue({
          update: jest.fn(),
        }),
      },
    }),
  };
});

describe("FileContent Component", () => {
  it("should render correctly", () => {
    const mockFileContent = {
      id: "file_content_id_1",
      title: "title",
      content: "content",
    };

    render(<FileContent fileContent={mockFileContent} />);

    const titleTextarea = screen.getByPlaceholderText("Title...");

    expect(titleTextarea).toBeInTheDocument();

    const contentTextarea = screen.getByPlaceholderText("Text");

    expect(contentTextarea).toBeInTheDocument();

    const saveButton = screen.queryByTitle("Save");
    expect(saveButton).not.toBeInTheDocument();
  });

  it("should show save button when title or content change and hide save button when user save the title or content", async () => {
    const mockFileContent = {
      id: "file_content_id_1",
      title: "title",
      content: "content",
    };

    render(<FileContent fileContent={mockFileContent} />);

    const titleTextarea = screen.getByPlaceholderText("Title...");
    const contentTextarea = screen.getByPlaceholderText("Text");

    await userEvent.type(titleTextarea, "test");
    await userEvent.type(contentTextarea, "test");

    const saveButton = screen.getByTitle("Save");
    expect(saveButton).toBeInTheDocument();

    await userEvent.click(saveButton);

    expect(screen.queryByTitle("Save")).not.toBeInTheDocument();
  });
});
