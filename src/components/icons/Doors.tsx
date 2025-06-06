import React from 'react';
import { useAppContext } from '@/context/AppContext';


const Doors: React.FC = () => {
    const { contractor } = useAppContext();
  const { accent, dark, darker } = contractor.colors;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="512"
      height="512"
      x="0"
      y="0"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      className="w-12 h-12 sm:w-14 sm:h-14 sm:mb-4 ml-2 mr-4 sm:ml-0 sm:mr-0"
    >
      <g>
        <path
          d="M101.587 8.127v495.746h308.825V8.127A8.128 8.128 0 0 0 402.285 0H109.714a8.128 8.128 0 0 0-8.127 8.127z"
          fill={accent}
          opacity="1"
          className=""
        />
        <path
          d="M337.27 292.571H174.73a8.128 8.128 0 0 1-8.127-8.127V73.143a8.128 8.128 0 0 1 8.127-8.127h162.54a8.128 8.128 0 0 1 8.127 8.127v211.302a8.127 8.127 0 0 1-8.127 8.126z"
          fill="#ffffff"
          opacity="1"
          className=""
        />
        <path
          d="M182.86 81.27h146.29v195.05H182.86z"
          fill="#ffffff"
          opacity="1"
          className=""
        />
        <path
          d="M215.365 227.556a8.102 8.102 0 0 0 5.746-2.381l81.27-81.27c3.175-3.175 3.175-8.317 0-11.492s-8.317-3.175-11.492 0l-81.27 81.27a8.123 8.123 0 0 0 0 11.492 8.102 8.102 0 0 0 5.746 2.381z"
          fill="#eddfdb"
          opacity="1"
          className=""
        />
        <path
          d="M215.365 178.794a8.102 8.102 0 0 0 5.746-2.381l32.508-32.508c3.175-3.175 3.175-8.317 0-11.492s-8.317-3.175-11.492 0l-32.508 32.508a8.123 8.123 0 0 0 0 11.492 8.102 8.102 0 0 0 5.746 2.381z"
          fill="#eddfdb"
          opacity="1"
          className=""
        />
        <path
          d="M410.413 8.127A8.126 8.126 0 0 0 402.286 0h-3.365L374.54 24.381H137.46L113.079 0h-3.365a8.126 8.126 0 0 0-8.127 8.127v3.365l24.381 24.381v468h16.254V40.635h227.556v463.238h16.254v-468l24.381-24.381V8.127z"
          fill={dark}
          opacity="1"
          className=""
        />
        <path
          d="M426.667 512H85.333c-4.492 0-8.127-3.639-8.127-8.127s3.635-8.127 8.127-8.127h341.333c4.492 0 8.127 3.639 8.127 8.127S431.159 512 426.667 512z"
          fill={darker}
          opacity="1"
          className=""
        />
        <circle
          cx="353.52"
          cy="284.44"
          r="12.19"
          fill="#414871"
          opacity="1"
          className=""
        />
        <path
          d="M337.27 471.365H174.73a8.125 8.125 0 0 1-8.127-8.127V325.079a8.125 8.125 0 0 1 8.127-8.127h162.54a8.125 8.125 0 0 1 8.127 8.127v138.159a8.125 8.125 0 0 1-8.127 8.127zm-154.413-16.254h146.286V333.206H182.857v121.905z"
          fill={dark}
          opacity="1"
          className=""
        />
      </g>
    </svg>
  );
};

export default Doors;
