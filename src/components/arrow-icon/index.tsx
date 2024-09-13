import React from "react";
import clsx from "clsx";

const ArrowIcon = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick?: React.MouseEventHandler;
}) => {
  return (
    <button onClick={onClick} type="button" title="Open folder">
      <svg
        className={clsx(isOpen && "rotate-90")}
        width="30"
        height="30"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.4631 36.9477C16.9625 36.5318 16.9625 35.7634 17.4631 35.3474L30.4858 24.528C30.8711 24.2079 31.4299 24.2079 31.8153 24.528C32.3159 24.944 32.3159 25.7123 31.8153 26.1283L18.7926 36.9477C18.4073 37.2679 17.8485 37.2679 17.4631 36.9477Z"
          fill="black"
        />
        <path
          d="M17.4631 13.0523C17.8484 12.7321 18.4072 12.7321 18.7926 13.0523L32.2036 24.1944C32.7042 24.6103 32.7042 25.3787 32.2036 25.7946C31.8182 26.1148 31.2594 26.1148 30.8741 25.7946L17.4631 14.6526C16.9624 14.2366 16.9624 13.4682 17.4631 13.0523Z"
          fill="black"
        />
      </svg>
    </button>
  );
};

export default ArrowIcon;
