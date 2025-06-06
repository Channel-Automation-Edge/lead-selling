import React from 'react';
import { useAppContext } from '@/context/AppContext';


const Closet: React.FC = () => {
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
          d="M64.5 27.16h99.979v417.681H64.5z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M121 35v385a3 3 0 0 1-3 3H89.5c-5.523 0-10-4.477-10-10V35l-7.532-6.309L64.5 35v402l70.617 7.862L203.5 437V35l-46.085-9.032z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M305.5 27.16h112v417.681h-112z"
          opacity="1"
          className=""
        />
        <g fill="#faf8f8">
          <path
            d="M305.5 116.418h108v25.443h-108zM305.5 223.418h108v25.443h-108zM305.5 330.418h108v25.443h-108z"
            opacity="1"
            className=""
          />
        </g>
        <path
          fill="#faf8f8"
          d="m151.5 407-21.617-3.5L121 407H99a4 4 0 0 1-4-4V69a4 4 0 0 1 4-4h22l3.904 1.798L151.5 65a4 4 0 0 1 4 4v334a4 4 0 0 1-4 4z"
          opacity="1"
          className=""
        />
        <path
          fill={accent}
          d="M432.5 27.16V423l-3.596 10.117 3.596 11.723h-30V27.16z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M155.5 69v334c0 2.21-1.79 4-4 4H121V65h30.5c2.21 0 4 1.79 4 4z"
          opacity="1"
          className=""
        />
        <path
          fill={accent}
          d="M135 447.394h181V24.606H135V423l5.564 9.862z"
          opacity="1"
          className=""
        />
        <path
          fill="#faf8f8"
          d="m170.947 404.862 108.543-1.106a4 4 0 0 0 4-4L286 393V268l-9.947-28.074L286 204V69a4 4 0 0 0-4-4H180l-9.521 1.096a4 4 0 0 0-4 4l.468 330.766a4 4 0 0 0 4 4z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M286 393v10a4 4 0 0 1-4 4H169a4 4 0 0 1-4-4V69a4 4 0 0 1 4-4h11v318c0 5.523 4.477 10 10 10zM286 268h-15c-5.523 0-10-4.477-10-10v-44c0-5.523 4.477-10 10-10h15z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="m402.5 423 5.128 6.032-5.128 11.915H316l-3.862-10.468L316 423z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M402.5 423h30v17.947h-30zM316 423v24.394H135l-9.75-15.421L135 423z"
          opacity="1"
          className=""
        />
        <path
          fill={accent}
          d="M113 497H88a4 4 0 0 1-4-4v-31.5a4 4 0 0 1 4-4h25a4 4 0 0 1 4 4V493a4 4 0 0 1-4 4zM409 497h-25a4 4 0 0 1-4-4v-35.5h33V493a4 4 0 0 1-4 4zM441.883 32.777 54.5 33a5 5 0 0 1-5-5V6a5 5 0 0 1 5-5l7-1h383a5 5 0 0 1 5 5v15l-2.617 7.777a5 5 0 0 1-5 5z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M449.5 20v10a5 5 0 0 1-5 5h-392a5 5 0 0 1-5-5V5a5 5 0 0 1 5-5h9v10c0 5.523 4.477 10 10 10z"
          opacity="1"
          className=""
        />
        <path
          fill={accent}
          d="M441.883 469.777 54.5 470a5 5 0 0 1-5-5v-22a5 5 0 0 1 5-5l7-1h383a5 5 0 0 1 5 5v15l-2.617 7.777a5 5 0 0 1-5 5z"
          opacity="1"
          className=""
        />
        <path
          fill={dark}
          d="M449.5 457v10a5 5 0 0 1-5 5h-392a5 5 0 0 1-5-5v-25a5 5 0 0 1 5-5h9v10c0 5.523 4.477 10 10 10z"
          opacity="1"
          className=""
        />
      </g>
    </svg>
  );
};

export default Closet;
