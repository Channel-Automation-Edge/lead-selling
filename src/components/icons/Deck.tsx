import React from 'react';
import { useAppContext } from '@/context/AppContext';


const Deck: React.FC = () => {
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
      viewBox="0 0 497 497"
      xmlSpace="preserve"
      className="w-12 h-12 sm:w-14 sm:h-14 sm:mb-4 ml-2 mr-4 sm:ml-0 sm:mr-0"
    >
      <g>
        <path
          fill={dark}
          d="M469.5 482.075h-441a5 5 0 0 1-5-5v-42h455v36l-4 6a5 5 0 0 1-5 5z"
          opacity="1"
          className=""
        />
        <path
          fill={darker}
          d="M33.5 461.075v-22l-7.298-5-7.702 5v42a5 5 0 0 0 5 5h450a5 5 0 0 0 5-5v-10h-435c-5.523 0-10-4.477-10-10zM256 190.11l-15 3.964v-34h15z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M189.5 374.574h118v15h-118z"
          opacity="1"
          className=""
        />
        <path
          fill={accent}
          d="M196 417.074h-15v-60.35l15-3.178zM316 416.074h-15v-62.528l15 3.178z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M141.5 379.574h15v35h-15zM96.5 379.075h15v36h-15zM340.5 379.575h15v35h-15zM385.5 379.575h15v35h-15z"
          opacity="1"
          className=""
        />
        <path
          fill={accent}
          d="M248.5 10.932c7.83-.184 14.607 3.668 18.5 5.407l230 102.736-159.5 5z"
          opacity="1"
          className=""
        />
        <path
          fill={accent}
          d="m158.5 124.075-137.869-4.349L234.649 15.333c3.893-1.739 9.68-4.401 13.851-4.401z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M248.5 10.932a29.99 29.99 0 0 0-12.235 2.608L0 119.075l22.351 7 29.787-7z"
          opacity="1"
          className=""
        />
        <path
          fill={accent}
          d="m258.5 124.075-112.5-5 80.03-84.436 22.47-23.707z"
          opacity="1"
          className=""
        />
        <path
          fill={accent}
          d="m248.5 10.932 9.103 9.604L351 119.075l-102.5 4V24.602z"
          opacity="1"
          className=""
        />
        <path
          fill={accent}
          d="M273.5 231.075c0 7.203-3.049 13.693-7.924 18.255-4.469 4.182-10.813 4.003-17.417 4.003-13.807 0-23.043-10.065-23.043-23.872l9.571-1.362h38.812v2.976z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M259.5 250.075c-12.783 0-23.318-9.596-24.812-21.976H223.5v2.976c0 13.807 11.193 25 25 25a24.904 24.904 0 0 0 17.076-6.745 25.04 25.04 0 0 1-6.076.745z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M249.5 190.575c-21.708 0-39.125 15.816-39.125 37.524 0 0 .028.666.922.666L223.5 230.5h63.685a1.62 1.62 0 0 0 1.62-1.62c0-19.494-14.191-35.673-32.805-38.77-2.114-.352-4.286.465-6.5.465z"
          opacity="1"
          className=""
        />
        <path
          fill={darker}
          d="M256 190.11c-2.479-.477-4.882-.535-7.5-.535-22.26 0-40.305 17.045-40.305 39.305 0 .895.725 1.62 1.62 1.62H223.5v-.62c0-19.642 13.901-36.194 32.5-39.77z"
          opacity="1"
          className=""
        />
        <path
          fill={darker}
          d="M31.351 161.575h25v253h-25z"
          opacity="1"
          className=""
        />
        <path
          fill={darker}
          d="M28.351 161.575h13v253h-13z"
          opacity="1"
          className=""
        />
        <path
          fill={darker}
          d="M443.649 161.575h25v253h-25z"
          opacity="1"
          className=""
        />
        <path
          fill={darker}
          d="M440.649 161.575h13v253h-13z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M490 162.075H7a5 5 0 0 1-5-5v-36l13-2h482v30l-2 8a5 5 0 0 1-5 5z"
          opacity="1"
          className=""
        />
        <path
          fill={darker}
          d="M15 139.075v-20H0v40a5 5 0 0 0 5 5h487a5 5 0 0 0 5-5v-10H25c-5.523 0-10-4.477-10-10z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M490 437.075H7a5 5 0 0 1-5-5v-13a5 5 0 0 1 5-5l6-2h479a5 5 0 0 1 5 5v9l-2 6a5 5 0 0 1-5 5z"
          opacity="1"
          className=""
        />
        <path
          fill={darker}
          d="M13 416.075v-4H5a5 5 0 0 0-5 5v17a5 5 0 0 0 5 5h487a5 5 0 0 0 5-5v-8H23c-5.523 0-10-4.477-10-10z"
          opacity="1"
          className=""
        />
        <path
          fill={accent}
          d="M118.042 347.367V283.67c0-7.257-5.153-13.309-12-14.699-.969-.197-1.973 1.699-3 1.699h-6a3 3 0 0 0-3 3v103.404a3 3 0 0 0 3 3h58.915a3 3 0 0 0 3-3l2-9v-3.708c0-6.627-5.373-12-12-12h-25.915a4.999 4.999 0 0 1-5-4.999z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M106.042 358.075v-89.104a15.052 15.052 0 0 0-3-.301h-8a3 3 0 0 0-3 3v107.404a3 3 0 0 0 3 3h62.915a3 3 0 0 0 3-3v-11h-44.915c-5.522.001-10-4.476-10-9.999z"
          opacity="1"
          className=""
        />
        <path
          fill={accent}
          d="m381.958 348.367 1-60.696c0-7.606 1.661-17.892 9-18.869a15.167 15.167 0 0 1 2-.131h8a3 3 0 0 1 3 3v97.404l-2 8a3 3 0 0 1-3 3h-58.915a3 3 0 0 1-3-3v-12.708c0-6.627 3.373-10 10-10l1-2h24.915c2.761 0 8-1.239 8-4z"
          opacity="1"
          className=""
        />
        <g fill={dark}>
          <path
            d="M391.958 268.801c-7.426 1.033-13 7.22-13 14.869v63.696a5 5 0 0 1-5 5h8c5.523 0 10-4.477 10-10zM349.042 359.075v-6.708h-1c-6.627 0-12 5.373-12 12v14.708a3 3 0 0 0 3 3h62.915a3 3 0 0 0 3-3v-10h-45.915c-5.522 0-10-4.477-10-10z"
            opacity="1"
            className=""
          />
        </g>
        <path
          fill={accent}
          d="M316 356.724H196l-8.041-29.041 125.371.391 2.67 12.65z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M206 340.724h110v-15H181v31h15v-6c0-5.523 4.477-10 10-10z"
          opacity="1"
          className=""
        />
        <path
          fill={accent}
          d="M324.5 324.075h-152c-7.18 0-9.617-2.82-9.617-10 0 0 .884-11.287 6.616-12.643a13.016 13.016 0 0 1 3.001-.357h152c7.18 0 13 5.82 13 13 0 7.179-5.82 10-13 10z"
          opacity="1"
          className=""
        />
        <path
          fill={accent}
          d="M169.499 301.432c-5.731 1.356-9.999 6.497-9.999 12.643 0 7.18 5.82 13 13 13h152c7.18 0 13-5.82 13-13H182.138c-6.98 0-12.639-5.663-12.639-12.643z"
          opacity="1"
          className=""
        />
      </g>
    </svg>
  );
};

export default Deck;
