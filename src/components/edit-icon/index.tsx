import React from "react";

const EditIcon = ({ onClick }: EditIconPropsType) => {
  return (
    <button onClick={onClick} type="button" title="Edit">
      <svg
        width="30"
        height="30"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.8817 32.8459L14.8819 32.8266L15.8817 32.8459ZM15.9741 28.0394L14.9743 28.0201L14.9743 28.0201L15.9741 28.0394ZM22.7093 34.7745L22.7285 35.7744L22.7286 35.7744L22.7093 34.7745ZM17.9028 34.867L17.922 35.8668L17.922 35.8668L17.9028 34.867ZM32.2721 17.5338C32.6626 17.1433 32.6626 16.5101 32.2721 16.1196C31.8815 15.7291 31.2484 15.7291 30.8578 16.1196L32.2721 17.5338ZM19.1003 27.8771C18.7098 28.2676 18.7098 28.9008 19.1003 29.2913C19.4909 29.6818 20.124 29.6818 20.5145 29.2913L19.1003 27.8771ZM34.6291 19.8908C35.0196 19.5003 35.0196 18.8672 34.6291 18.4766C34.2386 18.0861 33.6054 18.0861 33.2149 18.4766L34.6291 19.8908ZM21.4574 30.2341C21.0668 30.6247 21.0668 31.2578 21.4574 31.6483C21.8479 32.0389 22.481 32.0389 22.8716 31.6483L21.4574 30.2341ZM16.8815 32.8651L16.974 28.0586L14.9743 28.0201L14.8819 32.8266L16.8815 32.8651ZM16.8914 28.2005L30.6499 14.442L29.2357 13.0277L15.4772 26.7862L16.8914 28.2005ZM31.149 14.8856L35.8631 19.5997L37.2773 18.1854L32.5632 13.4714L31.149 14.8856ZM36.3067 20.0988L22.5482 33.8573L23.9624 35.2715L37.7209 21.513L36.3067 20.0988ZM22.6901 33.7747L17.8836 33.8672L17.922 35.8668L22.7285 35.7744L22.6901 33.7747ZM22.5482 33.8573C22.5863 33.8192 22.6265 33.7964 22.6573 33.7845C22.6865 33.7733 22.7 33.7745 22.6901 33.7747L22.7286 35.7744C23.1588 35.7661 23.6124 35.6215 23.9624 35.2715L22.5482 33.8573ZM35.8631 19.5997C36.0775 19.8141 36.1824 20.0302 36.2141 20.167C36.2497 20.3203 36.1771 20.2285 36.3067 20.0988L37.7209 21.513C38.2564 20.9775 38.2874 20.2544 38.1624 19.7152C38.0336 19.1595 37.7137 18.6219 37.2773 18.1854L35.8631 19.5997ZM30.6499 14.442C30.5202 14.5716 30.4283 14.499 30.5817 14.5346C30.7185 14.5663 30.9346 14.6712 31.149 14.8856L32.5632 13.4714C32.1268 13.0349 31.5891 12.7151 31.0334 12.5863C30.4943 12.4612 29.7712 12.4922 29.2357 13.0277L30.6499 14.442ZM16.974 28.0586C16.9741 28.0486 16.9754 28.0622 16.9642 28.0914C16.9523 28.1222 16.9295 28.1623 16.8914 28.2005L15.4772 26.7862C15.1272 27.1362 14.9826 27.5899 14.9743 28.0201L16.974 28.0586ZM14.8819 32.8266C14.8658 33.6643 15.3289 34.4208 15.8284 34.9203C16.3278 35.4198 17.0844 35.8829 17.922 35.8668L17.8836 33.8672C17.7878 33.869 17.5248 33.7883 17.2426 33.5061C16.9603 33.2239 16.8797 32.9609 16.8815 32.8651L14.8819 32.8266ZM15.2736 28.404L22.3447 35.4751L23.7589 34.0608L16.6878 26.9898L15.2736 28.404ZM30.8578 16.1196L19.1003 27.8771L20.5145 29.2913L32.2721 17.5338L30.8578 16.1196ZM33.2149 18.4766L21.4574 30.2341L22.8716 31.6483L34.6291 19.8908L33.2149 18.4766Z"
          fill="black"
        />
      </svg>
    </button>
  );
};

export default EditIcon;

interface EditIconPropsType {
  onClick?: React.MouseEventHandler;
}
