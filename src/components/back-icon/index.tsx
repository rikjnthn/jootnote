import React from "react";

const BackIcon = ({ onClick }: { onClick?: React.MouseEventHandler }) => {
  return (
    <button onClick={onClick} type="button" title="Back">
      <svg
        width="30"
        height="30"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.2929 24.2929C10.9024 24.6834 10.9024 25.3166 11.2929 25.7071L17.6569 32.0711C18.0474 32.4616 18.6805 32.4616 19.0711 32.0711C19.4616 31.6805 19.4616 31.0474 19.0711 30.6569L13.4142 25L19.0711 19.3431C19.4616 18.9526 19.4616 18.3195 19.0711 17.9289C18.6805 17.5384 18.0474 17.5384 17.6569 17.9289L11.2929 24.2929ZM37 24L12 24V26L37 26V24Z"
          fill="black"
        />
      </svg>
    </button>
  );
};

export default BackIcon;
