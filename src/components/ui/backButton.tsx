import React from 'react';

// Define the prop types for the BackButton component
interface BackButtonProps {
    onClick: () => void; // onReset is a function that returns void
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="flex items-center text-gray-600 hover:text-accentColor transition-colors duration-200 lg:ml-20 ">
      {/* <svg
        width="512"
        height="512"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 md:w-6 h-4 md:h-6"
      >
        <g clipPath="url(#clip0_156861_404)">
        <path d="M366.293 512C363.486 512.017 360.703 511.478 358.103 510.417C355.504 509.355 353.14 507.791 351.147 505.814L176.853 331.52C166.92 321.612 159.039 309.841 153.661 296.882C148.284 283.923 145.516 270.031 145.516 256C145.516 241.97 148.284 228.077 153.661 215.119C159.039 202.16 166.92 190.389 176.853 180.48L351.147 6.18704C353.136 4.19795 355.497 2.62012 358.096 1.54363C360.695 0.467147 363.48 -0.086914 366.293 -0.0869141C369.106 -0.0869141 371.892 0.467147 374.491 1.54363C377.09 2.62012 379.451 4.19795 381.44 6.18704C383.429 8.17613 385.007 10.5375 386.084 13.1364C387.16 15.7353 387.714 18.5207 387.714 21.3337C387.714 24.1467 387.16 26.9322 386.084 29.531C385.007 32.1299 383.429 34.4913 381.44 36.4804L207.147 210.774C195.162 222.774 188.43 239.04 188.43 256C188.43 272.96 195.162 289.227 207.147 301.227L381.44 475.52C383.44 477.504 385.027 479.863 386.11 482.463C387.193 485.062 387.75 487.851 387.75 490.667C387.75 493.483 387.193 496.272 386.11 498.871C385.027 501.471 383.44 503.83 381.44 505.814C379.447 507.791 377.083 509.355 374.483 510.417C371.884 511.478 369.101 512.017 366.293 512Z" fill="currentColor"/>
        </g>
        <defs>
            <clipPath id="clip0_156861_404">
            <rect width="512" height="512" fill="white"/>
            </clipPath>
        </defs>
      </svg> */}
      {/* <svg className="w-4 md:w-6 h-4 md:h-6" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" id="fi_3416141"><g id="Layer_2" data-name="Layer 2"><path d="m21 10h-13.172l3.586-3.586a2 2 0 0 0 -2.828-2.828l-7 7a2 2 0 0 0 0 2.828l7 7a2 2 0 1 0 2.828-2.828l-3.586-3.586h13.172a2 2 0 0 0 0-4z" fill="currentColor"></path></g></svg> */}

      <svg className="w-4 md:w-6 h-4 md:h-6" id="fi_5343109" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m390.627 54.627-201.372 201.373 201.372 201.373a32 32 0 1 1 -45.254 45.254l-224-224a32 32 0 0 1 0-45.254l224-224a32 32 0 0 1 45.254 45.254z" fill="currentColor"></path></svg>

      
      
    </button>
  );
};

export default BackButton;
