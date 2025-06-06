import React from 'react';
import { useAppContext } from '@/context/AppContext';


const ConfirmCheck: React.FC = () => {
  const { contractor } = useAppContext();
  const { accent, dark } = contractor.colors;

  return (
    <svg
      version="1.1"
      id="fi_753344"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 455.111 455.111"
      xmlSpace="preserve"
      className="h-14 sm:h-16"
    >
      <circle style={{ fill: accent }} cx="227.556" cy="227.556" r="227.556"></circle>
      <path
        style={{ fill: dark }}
        d="M455.111,227.556c0,125.156-102.4,227.556-227.556,227.556c-72.533,0-136.533-32.711-177.778-85.333
        c38.4,31.289,88.178,49.778,142.222,49.778c125.156,0,227.556-102.4,227.556-227.556c0-54.044-18.489-103.822-49.778-142.222
        C422.4,91.022,455.111,155.022,455.111,227.556z"
      ></path>
      <path
        style={{ fill: "#FFFFFF" }}
        d="M351.289,162.133L203.378,324.267c-9.956,11.378-27.022,11.378-36.978,0l-62.578-69.689
        c-8.533-9.956-8.533-25.6,1.422-35.556c9.956-8.533,25.6-8.533,35.556,1.422l44.089,49.778l129.422-140.8
        c9.956-9.956,25.6-11.378,35.556-1.422C359.822,136.533,359.822,153.6,351.289,162.133z"
      ></path>
    </svg>
  );
};

export default ConfirmCheck;
