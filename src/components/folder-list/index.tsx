import React from "react";
import Folder from "../folder";

const FolderList = () => {
  return (
    <div className="hide-scrollbar mt-2.5 h-full overflow-y-scroll px-1 md:mt-14">
      <Folder name="Folder" />
    </div>
  );
};

export default FolderList;
