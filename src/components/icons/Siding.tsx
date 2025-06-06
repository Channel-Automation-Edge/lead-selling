

import React from 'react';
import { useAppContext } from '@/context/AppContext';

const Siding: React.FC = () => {
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
      viewBox="0 0 510 510"
      xmlSpace="preserve"
      fillRule="evenodd"
className="w-12 h-12 sm:w-14 sm:h-14 sm:mb-4 ml-2 mr-4 sm:ml-0 sm:mr-0"
    >
      <g>
        <path
          fill={dark}
          d="m71.614 38.047 53.018-19.502 331.802 48.788V486.3l-32.876 5.155L60.66 438.516a5 5 0 0 1-4.248-5.5L70.163 309.37l-9.658-1.336a5 5 0 0 1-4.303-5.3l8.311-119.401-6.016-.787a5 5 0 0 1-4.312-5.58z"
          opacity="1"
          data-original="#d5a889"
        />
        <path
          fill={darker}
          d="m423.558 491.455 32.876-5.155V67.333l-32.876 22.485z"
          opacity="1"
          data-original="#937661"
        />
        <g fill={accent}>
          <path
            d="M423.558 358.255 70.163 309.37 56.412 433.016a5 5 0 0 0 4.248 5.5l362.898 52.939zM423.558 89.818 71.614 38.047 54.185 176.966a5 5 0 0 0 4.312 5.58l365.061 47.751z"
            opacity="1"
            data-original="#efc7a4"
          />
        </g>
      </g>
    </svg>
  );
};

export default Siding;