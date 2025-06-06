import React from 'react';
import { useAppContext } from '@/context/AppContext';

const SolarWall: React.FC = () => {
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
      viewBox="0 0 48 58"
      xmlSpace="preserve"
      className="w-12 h-12 sm:w-14 sm:h-14 sm:mb-4 ml-2 mr-4 sm:ml-0 sm:mr-0"
    >
      <g>
        <g fill="none" fillRule="nonzero">
          <path
            fill={dark}
            d="M3 50v4a3.956 3.956 0 0 0 3.913 4h37.174A3.956 3.956 0 0 0 48 54V4a3.956 3.956 0 0 0-3.913-4H6.913A3.956 3.956 0 0 0 3 4z"
            opacity="1"
            data-original="#26b99a"
          />
          <path
            fill={accent}
            d="M10 4h34v50H10z"
            opacity="1"
            data-original="#81ccb8"
          />
          <path
            fill={darker}
            d="M44 55H10a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h34a1 1 0 0 1 1 1v50a1 1 0 0 1-1 1zm-33-2h32V5H11z"
            opacity="1"
            data-original="#33907c"
          />
          <rect
            width="6"
            height="13"
            y="8"
            fill={darker}
            rx="2"
            opacity="1"
            data-original="#bdc3c7"
          />
          <rect
            width="6"
            height="13"
            y="37"
            fill={darker}
            rx="2"
            opacity="1"
            data-original="#bdc3c7"
          />
          <path
            fill="#ffffff"
            d="M33.193 21h-3.777l1.3-10.119a.806.806 0 0 0-1.387-.632l-9.113 9.435A.779.779 0 0 0 20.807 21h3.777l-1.3 10.119a.806.806 0 0 0 1.387.632l9.113-9.435A.779.779 0 0 0 33.193 21z"
            opacity="1"
            data-original="#f3d55b"
          />
          <g fill={darker}>
            <path
              d="M36 39H18a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2zM36 43H18a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2zM36 47H18a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z"
              opacity="1"
              data-original="#33907c"
            />
          </g>
          <circle
            cx="37.5"
            cy="30.5"
            r="2.5"
            fill="#ecf0f1"
            opacity="1"
            data-original="#ecf0f1"
          />
        </g>
      </g>
    </svg>
  );
};

export default SolarWall;