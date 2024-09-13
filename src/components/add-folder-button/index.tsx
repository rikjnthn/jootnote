import React from "react";

const AddFolderButton = () => {
  return (
    <button
      className="flex w-full items-center gap-5 py-4"
      type="button"
      title="Create new folder"
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 12.5V37.5M12.5 25H37.5"
          stroke="black"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-medium md:text-lg">New Folder</span>
    </button>
  );
};

export default AddFolderButton;
