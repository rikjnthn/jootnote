"use client";
import React from "react";

const SaveContentButton = ({
  onClick,
}: {
  onClick?: React.MouseEventHandler;
}) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-primary absolute right-5 top-5 h-fit min-h-fit px-5 py-3 font-normal md:right-7.5 lg:right-20"
      type="button"
      title="Save"
    >
      Save
    </button>
  );
};

export default SaveContentButton;
