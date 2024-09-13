import React from "react";

const Hamburger = ({ onClick }: { onClick: React.MouseEventHandler }) => {
  return (
    <button onClick={onClick} type="button" title="Hamburger">
      <svg
        width="40"
        height="40"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="12"
          y="16"
          width="25"
          height="2.63158"
          rx="1.31579"
          fill="black"
        />
        <rect
          x="12"
          y="23.8948"
          width="25"
          height="2.63158"
          rx="1.31579"
          fill="black"
        />
        <rect
          x="12"
          y="31.7894"
          width="25"
          height="2.63158"
          rx="1.31579"
          fill="black"
        />
      </svg>
    </button>
  );
};

export default Hamburger;
