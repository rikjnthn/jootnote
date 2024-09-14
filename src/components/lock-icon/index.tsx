import React from "react";

const LockIcon = () => {
  return (
    <button type="button" title="lock note">
      <svg
        width="35"
        height="35"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="14"
          y="20.3334"
          width="23"
          height="19.875"
          rx="2"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M19 20V17C19 14.2386 21.2386 12 24 12H27C29.7614 12 32 14.2386 32 17V20"
          stroke="black"
          strokeWidth="2"
          style={{
            strokeDasharray: 25,
            strokeDashoffset: 5,
          }}
        />
        <path
          d="M25 27V32.2083"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default LockIcon;
