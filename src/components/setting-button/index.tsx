"use client";
import React from "react";

const SettingButton = ({ onClick }: { onClick?: React.MouseEventHandler }) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-5 py-4"
      type="button"
      title="Setting"
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.2431 28.9729C26.2968 28.9729 27.3073 28.5543 28.0523 27.8093C28.7974 27.0642 29.216 26.0537 29.216 25C29.216 23.9463 28.7974 22.9358 28.0523 22.1907C27.3073 21.4457 26.2968 21.0271 25.2431 21.0271C24.1894 21.0271 23.1789 21.4457 22.4338 22.1907C21.6887 22.9358 21.2701 23.9463 21.2701 25C21.2701 26.0537 21.6887 27.0642 22.4338 27.8093C23.1789 28.5543 24.1894 28.9729 25.2431 28.9729Z"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 26.1654V23.8346C12 22.4573 13.1257 21.3184 14.5162 21.3184C16.9132 21.3184 17.8932 19.6233 16.688 17.5442C15.9994 16.3523 16.4099 14.8028 17.6151 14.1142L19.9061 12.8031C20.9523 12.1807 22.3031 12.5515 22.9255 13.5977L23.0712 13.8493C24.2631 15.9285 26.2231 15.9285 27.4282 13.8493L27.5738 13.5977C28.1963 12.5515 29.5471 12.1807 30.5933 12.8031L32.8843 14.1142C34.0894 14.8028 34.5 16.3523 33.8113 17.5442C32.6062 19.6233 33.5862 21.3184 35.9832 21.3184C37.3605 21.3184 38.4994 22.4441 38.4994 23.8346V26.1654C38.4994 27.5427 37.3737 28.6816 35.9832 28.6816C33.5862 28.6816 32.6062 30.3767 33.8113 32.4558C34.5 33.661 34.0894 35.1972 32.8843 35.8858L30.5933 37.1969C29.5471 37.8193 28.1963 37.4485 27.5738 36.4023L27.4282 36.1507C26.2363 34.0715 24.2763 34.0715 23.0712 36.1507L22.9255 36.4023C22.3031 37.4485 20.9523 37.8193 19.9061 37.1969L17.6151 35.8858C17.0378 35.5534 16.616 35.0056 16.4422 34.3625C16.2684 33.7195 16.3568 33.0338 16.688 32.4558C17.8932 30.3767 16.9132 28.6816 14.5162 28.6816C13.1257 28.6816 12 27.5427 12 26.1654Z"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-medium md:text-lg">Setting</span>
    </button>
  );
};

export default SettingButton;
