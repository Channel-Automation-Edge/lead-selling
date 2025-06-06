


import React from 'react';
import { useAppContext } from '@/context/AppContext';


const Kitchen: React.FC = () => {
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
          d="M488 56H184a8 8 0 0 0-8 8v112a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8V64a8 8 0 0 0-8-8z"
          fill={accent}
          opacity="1"
          className=""
        ></path>
        <path
          d="M256 216c-13.234 0-24 10.766-24 24v40h16v-40c0-4.41 3.586-8 8-8s8 3.59 8 8v8c0 4.418 3.578 8 8 8s8-3.582 8-8v-8c0-13.234-10.766-24-24-24z"
          fill={darker}
          opacity="1"
          className=""
        ></path>
        <path
          d="M232 256h16v24h-16z"
          fill={darker}
          opacity="1"
          className=""
        ></path>
        <path
          d="M168 416v32a8 8 0 0 0 16 0v-32h-16z"
          fill="#414871"
          opacity="1"
          className=""
        ></path>
        <path
          d="M168 416h16v24h-16z"
          fill="#414871"
          opacity="1"
          className=""
        ></path>
        <path
          d="M328 416v32a8 8 0 0 0 16 0v-32h-16z"
          fill="#414871"
          opacity="1"
          className=""
        ></path>
        <path
          d="M328 416h16v24h-16z"
          fill="#414871"
          opacity="1"
          className=""
        ></path>
        <path
          d="M472 416v32a8 8 0 0 0 16 0v-32h-16z"
          fill="#414871"
          opacity="1"
          className=""
        ></path>
        <path
          d="M472 416h16v24h-16z"
          fill="#414871"
          opacity="1"
          className=""
        ></path>
        <path
          d="M24 416v32a8 8 0 0 0 16 0v-32H24z"
          fill="#414871"
          opacity="1"
          className=""
        ></path>
        <path
          d="M24 416h16v24H24z"
          fill="#414871"
          opacity="1"
          className=""
        ></path>
        <path
          d="M488 424H24a8 8 0 0 1-8-8V280h480v136a8 8 0 0 1-8 8z"
          fill={accent}
          opacity="1"
          className=""
        ></path>
        <path
          d="M16 280h480v24H16z"
          fill={dark}
          opacity="1"
          className=""
        ></path>
        <path
          d="M16 280h160v144H24a8 8 0 0 1-8-8V280z"
          fill={darker}
          opacity="1"
          className=""
        ></path>
        <path
          d="M272 320h-32c-4.422 0-8-3.582-8-8s3.578-8 8-8h32c4.422 0 8 3.582 8 8s-3.578 8-8 8z"
          fill={darker}
          opacity="1"
          className=""
        ></path>
        <path
          d="M120 107.883V64a8 8 0 0 0-8-8H80a8 8 0 0 0-8 8v43.883a8.001 8.001 0 0 1-3.35 6.51l-49.3 35.214a8.001 8.001 0 0 0-3.35 6.51V176a8 8 0 0 0 8 8h144a8 8 0 0 0 8-8v-19.883a8.001 8.001 0 0 0-3.35-6.51l-49.3-35.214a8.001 8.001 0 0 1-3.35-6.51z"
          fill={darker}
          opacity="1"
          className=""
        ></path>
        <path
          d="M16 280h160v24H16z"
          fill={darker}
          opacity="1"
          className=""
        ></path>
        <path
          d="M504 288H8c-4.422 0-8-3.582-8-8s3.578-8 8-8h496c4.422 0 8 3.582 8 8s-3.578 8-8 8z"
          fill={accent}
          opacity="1"
          className=""
        ></path>
        <path
          d="M56.078 312c-4.422 0-8.039-3.582-8.039-8s3.539-8 7.961-8h.078c4.422 0 8 3.582 8 8s-3.578 8-8 8zM136.078 312c-4.422 0-8.039-3.582-8.039-8s3.539-8 7.961-8h.078c4.422 0 8 3.582 8 8s-3.578 8-8 8zM96.078 312c-4.422 0-8.039-3.582-8.039-8s3.539-8 7.961-8h.078c4.422 0 8 3.582 8 8s-3.578 8-8 8z"
          fill="#414871"
          opacity="1"
          className=""
        ></path>
        <path
          d="M16 320h160v16H16z"
          fill={darker}
          opacity="1"
          className=""
        ></path>
        <path
          d="M144 336H48v48a8 8 0 0 0 8 8h80a8 8 0 0 0 8-8v-48z"
          fill={accent}
          opacity="1"
          className=""
        ></path>
        <path
          d="M248 288h16v136h-16z"
          fill={dark}
          opacity="1"
          className=""
        ></path>
        <path
          d="M248 288h16v16h-16z"
          fill={darker}
          opacity="1"
          className=""
        ></path>
        <path
          d="M496 336v-16H344v-32h-16v136h16v-40h152v-16H344v-32z"
          fill={dark}
          opacity="1"
          className=""
        ></path>
        <path
          d="M328 288h16v16h-16z"
          fill={darker}
          opacity="1"
          className=""
        ></path>
        <path
          d="M408 288v8c0 4.422 3.582 8 8 8s8-3.578 8-8v-8h-16zM408 336v8c0 4.422 3.582 8 8 8s8-3.578 8-8v-8h-16zM408 384v8c0 4.422 3.582 8 8 8s8-3.578 8-8v-8h-16zM264 112v-8c0-4.422-3.582-8-8-8s-8 3.578-8 8v8h16zM264 184v-8c0-4.422-3.582-8-8-8s-8 3.578-8 8v8h16z"
          fill={darker}
          opacity="1"
          className=""
        ></path>
        <path
          d="M328 56v56H176v16h152v56h16V56z"
          fill={dark}
          opacity="1"
          className=""
        ></path>
        <path
          d="M432 160h-32c-4.422 0-8-3.582-8-8s3.578-8 8-8h32c4.422 0 8 3.582 8 8s-3.578 8-8 8z"
          fill={darker}
          opacity="1"
          className=""
        ></path>
        <path
          d="M408 56h16v128h-16zM68.65 114.393l-49.3 35.214c-.898.641-1.601 1.475-2.156 2.393h157.611c-.555-.918-1.258-1.752-2.156-2.393l-49.3-35.214c-.897-.641-1.6-1.475-2.156-2.393H70.806c-.556.918-1.259 1.751-2.156 2.393z"
          fill={dark}
          opacity="1"
          className=""
        ></path>
        <path
          d="M136 392H56a8 8 0 0 1-8-8v-32h96v32a8 8 0 0 1-8 8z"
          fill={dark}
          opacity="1"
          className=""
        ></path>
      </g>
    </svg>
  );
};

export default Kitchen;
