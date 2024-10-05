import { render } from "@testing-library/react";
import FolderListSkeleton from ".";

describe("FolderListSkeleton", () => {
  it("should render correctly", () => {
    const { container } = render(<FolderListSkeleton />);

    const skeletonContainer = container.querySelector("div");
    expect(skeletonContainer).toBeInTheDocument();

    const skeletonFolders = skeletonContainer?.querySelectorAll("div");
    expect(skeletonFolders?.length).toBe(3);
    skeletonFolders?.forEach((skeletonFolder) => {
      expect(skeletonFolder).toBeInTheDocument();
    });
  });
});
