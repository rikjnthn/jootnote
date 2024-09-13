"use client";
import React, { useState } from "react";
import clsx from "clsx";

import ArrowIcon from "../arrow-icon";
import EditIcon from "../edit-icon";
import DeleteIcon from "../delete-icon";
import PlusIcon from "../plus-icon";
import FileList from "../file-list";

const Folder = ({ name }: { name: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="cursor-default">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="folder flex justify-between py-2.5"
      >
        <div className="flex items-center">
          <ArrowIcon isOpen={isOpen} />
          <span className="line-clamp-1 font-medium md:text-lg">{name}</span>
        </div>

        <div className="folder-util flex items-center">
          <EditIcon />
          <DeleteIcon title="Delete folder" />
          <PlusIcon title="Add file" />
        </div>
      </div>

      <div className={clsx(!isOpen && "hidden")}>
        <FileList />
      </div>
    </div>
  );
};

export default Folder;
