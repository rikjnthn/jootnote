import React from "react";
import DeleteIcon from "../delete-icon";
import EditIcon from "../edit-icon";

const File = ({ name }: { name: string }) => {
  return (
    <div className="file flex justify-between py-2 pl-8">
      <span className="line-clamp-1 md:text-lg">{name} </span>

      <div className="file-util flex items-center">
        <EditIcon />
        <DeleteIcon title="Delete file" />
      </div>
    </div>
  );
};

export default File;
