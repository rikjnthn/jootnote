"use client";
import React from "react";

const FolderListSkeleton = () => {
  return (
    <div className="hide-scrollbar flex h-full flex-col gap-4 overflow-y-scroll px-7 pt-5 md:mt-14">
      <div className="skeleton h-8 w-full rounded-none"></div>
      <div className="skeleton h-8 w-full rounded-none"></div>
      <div className="skeleton h-8 w-full rounded-none"></div>
    </div>
  );
};

export default FolderListSkeleton;
