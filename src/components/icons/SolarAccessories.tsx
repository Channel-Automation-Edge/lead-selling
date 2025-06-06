import React from 'react';
import { useAppContext } from '@/context/AppContext';

const SolarAccessories: React.FC = () => {
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
      viewBox="0 0 64 64"
      xmlSpace="preserve"
      className="w-12 h-12 sm:w-14 sm:h-14 sm:mb-4 ml-2 mr-4 sm:ml-0 sm:mr-0"
    >
      <g>
        <path
          fill={darker}
          d="M20 57h-8a1 1 0 0 1-1-1V41h2v14h7zM52 57h-8v-2h7V29h2v27a1 1 0 0 1-1 1z"
          opacity="1"
          data-original="#e2e7f6"
        />
        <path
          fill="#ffffff"
          d="M26.488 15H22l-9.844 9.844A9 9 0 1 1 26.488 15z"
          opacity="1"
          data-original="#f4a93c"
        />
        <path
          fill={accent}
          d="M20 49h24v13H20z"
          opacity="1"
          data-original="#3b5892"
        />
        <path
          fill={dark}
          d="M42 57v-8H20v11h19a3 3 0 0 0 3-3z"
          opacity="1"
          data-original="#4c6cb5"
        />
        <path
          fill={darker}
          d="M20 49h24v4H20z"
          opacity="1"
          data-original="#c8cded"
        />
        <path
          fill={darker}
          d="M42 50v-1H20v2h21a1 1 0 0 0 1-1z"
          opacity="1"
          data-original="#e2e7f6"
        />
        <path
          fill={accent}
          d="M62 15H22L2 35h40z"
          opacity="1"
          data-original="#3b5892"
        />
        <path
          fill="#939393"
          d="M2 35h40v6H2z"
          opacity="1"
          data-original="#939393"
        />
        <path
          fill="#b5b5b5"
          d="M62 15 42 35v6l20-20z"
          opacity="1"
          data-original="#b5b5b5"
        />
        <path
          fill={dark}
          d="m55 22 2-2h-8.586l5-5h-2.828l-5 5h-7.172l5-5h-2.828l-5 5h-7.172l5-5h-2.828l-5 5H17l-2 2h8.586l-4 4H11l-2 2h8.586l-7 7h2.828l7-7h7.172l-7 7h2.828l7-7h7.172l-7 7h2.828l7-7H49l2-2h-8.586l4-4zm-25.414 4h-7.172l4-4h7.172zm10 0h-7.172l4-4h7.172z"
          opacity="1"
          data-original="#4c6cb5"
        />
        <path
          fill="#b5b5b5"
          d="M39 37v-2H2v3h36a1 1 0 0 0 1-1z"
          opacity="1"
          data-original="#b5b5b5"
        />
        <path
          fill={dark}
          d="M22 49v-4h6v4M36 49v-4h6v4"
          opacity="1"
          data-original="#5e87ca"
        />
        <path
          fill={accent}
          d="M40 46v-1h-4v2h3a1 1 0 0 0 1-1zM26 46v-1h-4v2h3a1 1 0 0 0 1-1z"
          opacity="1"
          data-original="#78a0d4"
        />
        <path
          fill={darker}
          d="M27 56h10v2H27z"
          opacity="1"
          data-original="#c8cded"
        />
        <g fill="#f9d266">
          <path
            d="M17 2h2v4h-2zM2 17h4v2H2zM5.291 6.707l1.414-1.414 3 3-1.414 1.414zM26.29 8.295l3-3 1.413 1.414-3 3z"
            fill="#ffffff"
            opacity="1"
            data-original="#f9d266"
          />
        </g>
      </g>
    </svg>
  );
};

export default SolarAccessories;