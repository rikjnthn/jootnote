import React from "react";

const PlusIcon = ({ title, onClick }: PlusIconPropsType) => {
  return (
    <button onClick={onClick} type="button" title={title}>
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
    </button>
  );
};

export default PlusIcon;

interface PlusIconPropsType {
  title?: string;
  onClick?: React.MouseEventHandler;
}
