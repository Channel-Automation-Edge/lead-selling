import React from 'react';
import { useAppContext } from '@/context/AppContext';


const Trowel: React.FC = () => {
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
          fill={accent}
          d="M423.407 165.428 378.47 33.566c-6.84-20.072-25.695-26.441-46.9-26.441H145.203L128.782 0h-23.371C91.995 0 79.97 10.045 79.269 23.442c-.748 14.287 10.615 26.106 24.739 26.106h48.664c8.227 0 15.853 5.622 17.174 13.743 1.683 10.348-6.259 19.29-16.29 19.29h-7.374c-8.227 0-15.853 5.622-17.174 13.743-1.683 10.348 6.259 19.29 16.29 19.29h89.955c8.227 0 15.853 5.622 17.174 13.743 1.683 10.348-6.259 19.29-16.29 19.29h-32.148c-8.227 0-15.853 5.622-17.174 13.742-1.683 10.348 6.259 19.29 16.29 19.29h87.837l80.796 10.497h36.235c16.979-.002 20.911-10.676 15.434-26.748z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M386.485 33.565C379.645 13.494 360.791 0 339.586 0H128.782c0 9.122 7.395 16.516 16.516 16.516h194.29a33.02 33.02 0 0 1 31.256 22.369l44.946 131.873c1.185 3.492-.177 6.177-1.097 7.468-.927 1.29-3.024 3.452-6.718 3.452h-47.968v16.516h47.965c16.98 0 28.928-16.694 23.45-32.766z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="m409.304 236.119-59.721-179.16-14.35-15.668a22.916 22.916 0 0 0-21.739 15.668l-59.72 179.16c-1.318 3.953-1.419 7.942-.551 11.625l20.833 10.675h114.966c14.592-.001 24.896-8.457 20.282-22.3z"
          opacity="1"
          className=""
        />
        <path
          fill={darker}
          d="M356.972 56.959a22.915 22.915 0 0 0-21.739-15.668c-.244 0-.477.05-.719.057l66.51 199.999c.685 2.048-.129 3.621-.669 4.371-.54.758-1.782 2.024-3.944 2.024H253.23c2.184 9.199 10.414 16.516 20.825 16.516H396.41c14.593 0 24.896-14.296 20.282-28.139z"
          opacity="1"
          className=""
        />
        <path
          fill={darker}
          d="M335.233 198.194c-9.121 0-16.516 7.395-16.516 16.516v66.064l9.038 5.988h16.29v-79.167z"
          opacity="1"
          className=""
        />
        <path
          fill={darker}
          d="M335.233 198.194v66.064c0 9.122-7.395 16.516-16.516 16.516v24.774h33.032V214.71c0-9.121-7.394-16.516-16.516-16.516z"
          opacity="1"
          className=""
        />
        <path
          fill={darker}
          d="M343.491 297.29h-24.775a8.258 8.258 0 0 0-8.258 8.258v8.258l41.291 8.684v-16.942a8.258 8.258 0 0 0-8.258-8.258z"
          opacity="1"
          className=""
        />
        <path
          fill={darker}
          d="M351.749 297.29h-8.258c0 9.122-7.395 16.516-16.516 16.516h-16.517v33.032h49.548v-41.29a8.257 8.257 0 0 0-8.257-8.258z"
          opacity="1"
          className=""
        />
        <path
          fill={accent}
          d="M351.749 330.323h-41.29a8.258 8.258 0 0 0-8.258 8.258v140.387c0 9.583 4.081 18.214 10.6 24.248 5.891 5.452 22.432 7.121 22.432 7.121 18.243 0 24.774-13.126 24.774-31.369V338.581a8.258 8.258 0 0 0-8.258-8.258z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M360.007 330.323h-8.258V470.71c0 18.243-14.789 33.032-33.032 33.032-2 0-4.014-.186-5.916-.527C318.69 508.66 326.58 512 335.233 512c18.243 0 33.032-14.789 33.032-33.032V338.581a8.258 8.258 0 0 0-8.258-8.258z"
          opacity="1"
          className=""
        />
      </g>
    </svg>
  );
};

export default Trowel;
