import React from "react";

const DeleteIcon = ({ onClick, title }: DeleteIconPropsType) => {
  return (
    <button
      className="flex h-full w-full items-center justify-center"
      onClick={onClick}
      type="button"
      title={title}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.3388 16.3388L34.0165 34.0164M16.3388 34.0164L34.0165 16.3388"
          stroke="black"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
};

export default DeleteIcon;

interface DeleteIconPropsType {
  onClick?: React.MouseEventHandler;
  title?: string;
}
