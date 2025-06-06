import React from 'react';
import { useAppContext } from '@/context/AppContext';


const Repair: React.FC = () => {
    const { contractor } = useAppContext();
  const { accent, dark } = contractor.colors;

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
          fill={accent}
          d="M408.64 128.573c.003-.005-42.542-32.807-81.824-63.092v194.966l41.683-30v-75h30.57c8.283 0 15.46-6.773 15.43-15.055-.017-4.817-2.314-9.087-5.859-11.819z"
          opacity="1"
          className=""
        ></path>
        <path
          fill={accent}
          d="M257.656 12.164c-2.698-2.08-5.927-3.12-9.156-3.12s-6.458 1.04-9.156 3.12c-67.193 51.8-150.99 116.401-150.984 116.409-3.544 2.732-5.842 7.001-5.86 11.818-.031 8.284 7.147 15.057 15.43 15.057h30.57v75l30 30h180V89.24a30 30 0 0 0-11.683-23.759l-69.161-53.317z"
          opacity="1"
          className=""
        ></path>
        <path
          fill={dark}
          d="M338.5 290.448H361a7.5 7.5 0 0 0 7.5-7.5v-52.5h-30l-30 30z"
          opacity="1"
          className=""
        ></path>
        <path
          fill={dark}
          d="M308.5 230.448v-97.5a7.5 7.5 0 0 0-7.5-7.5H196a7.5 7.5 0 0 0-7.5 7.5v97.5h-60v52.5a7.5 7.5 0 0 0 7.5 7.5h82.5l30-60 30 60h60v-60z"
          opacity="1"
          className=""
        ></path>
        <path
          fill={accent}
          d="m233.5 230.448 15 60h30v-30z"
          opacity="1"
          className=""
        ></path>
        <path
          fill={accent}
          d="M218.5 260.448v30h30v-60z"
          opacity="1"
          className=""
        ></path>
        <path
          fill="#ffffff"
          d="M271 155.448h-22.5l-15 30v45l15 30h30v-97.5a7.5 7.5 0 0 0-7.5-7.5z"
          opacity="1"
          className=""
        ></path>
        <path
          fill="#ffffff"
          d="M248.5 155.448H226a7.5 7.5 0 0 0-7.5 7.5v97.5h30z"
          opacity="1"
          className=""
        ></path>
        <path
          fill={dark}
          d="M15.069 427.956c-12.29 0-19.458 14.04-12.094 23.879 16.412 21.928 42.592 36.121 72.09 36.121l30-60z"
          opacity="1"
          className=""
        ></path>
        <path
          fill={dark}
          d="M494.025 344.078c-16.412-21.928-42.592-36.121-72.09-36.121l36.019 60h23.978c12.29-.001 19.458-14.04 12.093-23.879z"
          opacity="1"
          className=""
        ></path>
        <path
          fill={dark}
          d="M457.954 367.956c7.378 0 11.682-14.04 7.261-23.879-9.853-21.928-25.57-36.121-43.279-36.121l-30 60zM481.931 427.956h-23.978l-36.019 60c29.498 0 55.678-14.193 72.09-36.121 7.366-9.839.197-23.879-12.093-23.879z"
          opacity="1"
          className=""
        ></path>
        <path
          fill={accent}
          d="M465.214 451.835c4.421-9.839.118-23.879-7.26-23.879h-36.019v-120c-24.853 0-47.353 10.073-63.64 26.36l-18.64 18.64H157.344l-18.639-18.639c-16.287-16.287-38.787-26.361-63.64-26.361-29.498 0-55.678 14.193-72.09 36.121-7.364 9.839-.196 23.879 12.094 23.879h59.996v120c24.853 0 47.353-10.073 63.64-26.36l18.64-18.64h182.311l18.64 18.639c16.287 16.287 38.787 26.361 63.64 26.361 17.708 0 33.425-14.192 43.278-36.121z"
          opacity="1"
          className=""
        ></path>
        <path
          fill={dark}
          d="M333.186 382.956h-30l-31.251 15 31.251 15h30a90.547 90.547 0 0 1 0-30z"
          opacity="1"
          className=""
        ></path>
        <path
          fill={dark}
          d="M303.186 382.956H163.813a90.547 90.547 0 0 1 0 30h139.373a90.547 90.547 0 0 1 0-30z"
          opacity="1"
          className=""
        ></path>
      </g>
    </svg>
  );
};

export default Repair;
