import React from 'react';
import { useAppContext } from '@/context/AppContext';

const WalkInTub: React.FC = () => {
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
      viewBox="0 0 496.562 496.562"
      xmlSpace="preserve"
      className="w-12 h-12 sm:w-14 sm:h-14 sm:mb-4 ml-2 mr-4 sm:ml-0 sm:mr-0"
    >
      <g>
        <path
          fill={accent}
          d="M64.496 179.909h-30V88.7c0-26.282 20.792-48.295 47.07-48.794 26.889-.51 48.926 21.215 48.926 47.989v39.259a4.51 4.51 0 0 1-4.509 4.509H105a4.51 4.51 0 0 1-4.509-4.509V88.337c0-9.746-7.564-18.058-17.303-18.427-10.239-.387-18.692 7.831-18.692 17.985z"
          opacity="1"
          data-original="#f9f3f1"
          className=""
        />
        <path
          fill={dark}
          d="M51.634 95.555c0-26.282 20.792-48.296 47.07-48.794a48.088 48.088 0 0 1 9.785.797c-7.739-5.006-16.998-7.841-26.923-7.653-26.277.499-47.07 22.512-47.07 48.794v91.209h17.138z"
          opacity="1"
          data-original="#f3eae6"
          className=""
        />
        <path
          fill={darker}
          d="M72.831 448.165v1h-47.83v-274.1c0-6.16 5-11.16 11.16-11.16h25.51c6.17 0 11.16 5 11.16 11.16v231.81z"
          opacity="1"
          data-original="#e1d3ce"
          className=""
        />
        <path
          fill={darker}
          d="M45.933 188.232c0-6.16 5-11.16 11.16-11.16h15.738v-2.007c0-6.16-4.99-11.16-11.16-11.16h-25.51c-6.16 0-11.16 5-11.16 11.16v274.1h20.932z"
          opacity="1"
          data-original="#cdbfba"
          className=""
        />
        <path
          fill={accent}
          d="M483.711 277.266c0 94.935-76.96 171.895-171.895 171.895H185.747c-94.935 0-171.895-76.96-171.895-171.895v-55.891h469.859z"
          opacity="1"
          data-original="#f9f3f1"
          className=""
        />
        <path
          fill={dark}
          d="M13.852 221.375v55.891c0 94.935 76.96 171.896 171.896 171.896h126.068c16.427 0 32.315-2.308 47.36-6.61h-111.39c-94.935 0-171.895-76.96-171.895-171.895 0-6.784 5.499-12.283 12.283-12.283H483.07l.641-.641v-36.356H13.852z"
          opacity="1"
          data-original="#f3eae6"
          className=""
        />
        <path
          fill={accent}
          d="M483.069 238.372c7.452 0 13.493-6.041 13.493-13.493v-7.007c0-7.452-6.041-13.493-13.493-13.493H13.493C6.041 204.378 0 210.419 0 217.872v7.007c0 7.452 6.041 13.493 13.493 13.493z"
          opacity="1"
          data-original="#f9f3f1"
          className=""
        />
        <g fill={darker}>
          <path
            d="M260.73 355.651h-96.299l-19.22 16.714v32.81a3.24 3.24 0 0 0 3.24 3.24h117.48c1.78 0 3.23-1.45 3.23-3.24v-32.81z"
            opacity="1"
            data-original="#93d8de"
            className=""
          />
          <path
            d="M255.611 195.685h-96.85c-7.48 0-13.55 6.07-13.55 13.55v134.48l19.873 14.325h94.667l9.41-14.325v-134.48c0-7.48-6.07-13.55-13.55-13.55z"
            opacity="1"
            data-original="#93d8de"
            className=""
          />
          <path
            d="M178.127 195.685h-19.366c-7.48 0-13.55 6.07-13.55 13.55v134.48l19.873 14.325h13.043z"
            opacity="1"
            data-original="#93d8de"
            className=""
          />
          <path
            d="M192.816 386.927c-8.113 0-14.689-6.577-14.689-14.689v-16.586h-13.695l-19.22 16.714v32.81a3.24 3.24 0 0 0 3.24 3.24h117.48c1.78 0 3.23-1.45 3.23-3.24v-18.249z"
            opacity="1"
            data-original="#93d8de"
            className=""
          />
        </g>
        <path
          fill={darker}
          d="M145.211 343.715h123.95v28.65h-123.95z"
          opacity="1"
          data-original="#efe2dd"
          className=""
        />
        <path
          fill={darker}
          d="M145.211 343.715h32.916v28.65h-32.916z"
          opacity="1"
          data-original="#e1d3ce"
          className=""
        />
        <path
          fill={dark}
          d="M461.761 456.665H11.791c-4.142 0-7.5-3.357-7.5-7.5s3.358-7.5 7.5-7.5h449.97c4.142 0 7.5 3.357 7.5 7.5s-3.358 7.5-7.5 7.5z"
          opacity="1"
          data-original="#f3eae6"
          className=""
        />
      </g>
    </svg>
  );
};

export default WalkInTub;