import React from 'react';
import { useAppContext } from '@/context/AppContext';

const Header: React.FC = () => {
  const { contractor, user } = useAppContext();
  
  // Extract first letters of first and last name for the avatar
  const getInitials = () => {
    const firstInitial = user?.firstname ? user.firstname.charAt(0).toUpperCase() : '';
    const lastInitial = user?.lastname ? user.lastname.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <header className="sticky top-0 bg-gray-50 z-50">
      <div className="flex justify-between items-center px-5 py-2">
        {/* Menu Icon */}
        <div className="flex items-center">
          <button className="text-gray-700 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <img className="h-14" src={contractor?.content?.logo || '/images/logo.png'} alt="logo" />
        </div>

        {/* User Avatar */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
            {getInitials()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
