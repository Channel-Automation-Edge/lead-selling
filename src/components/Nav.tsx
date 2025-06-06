import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

// Icon components for navigation
const HomeIcon = ({ isActive }: { isActive: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill={isActive ? "currentColor" : "none"}
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="transition-all duration-300"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <circle cx="12" cy="11" r="3" />
  </svg>
);

const ServicesIcon = ({ isActive }: { isActive: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill={isActive ? "currentColor" : "none"}
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="transition-all duration-300"
  >
    <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" />
    <path d="M9 10h6" />
    <path d="M12 7v6" />
    <path d="M9 16h6" />
  </svg>
);

const ChatbotIcon = ({ isActive }: { isActive: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill={isActive ? "currentColor" : "none"}
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="transition-all duration-300"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M6 7v0" />
    <path d="M6 11v0" />
    <path d="M12 7v0" />
    <path d="M12 11v0" />
    <path d="M18 7v0" />
    <path d="M18 11v0" />
    <path d="M10 17l2 4 2-4" />
  </svg>
);

const AccountIcon = ({ isActive }: { isActive: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill={isActive ? "currentColor" : "none"}
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="transition-all duration-300"
  >
    <circle cx="12" cy="6" r="4" />
    <path d="M20 17.5c0 2.485-3.582 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5z" />
  </svg>
);

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  searchParams?: URLSearchParams;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon, isActive, searchParams }) => {
  // Build the destination with search parameters preserved
  const destination = {
    pathname: to,
    search: searchParams ? searchParams.toString() : ''
  };

  return (
    <Link 
      to={destination} 
      className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
        isActive ? 'text-accentColor' : 'text-gray-600 hover:text-accentColor'
      }`}
    >
      <div className="flex items-center">
        <span className="flex-shrink-0">{icon}</span>
        <span className={`ml-2 hidden sm:block font-medium ${isActive ? '' : 'text-gray-600'}`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

const Nav: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const pathname = location.pathname.split('/')[1] || ''; // Get the first part of the path
  
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-full shadow-lg px-2 py-2 flex space-x-1">
        <NavItem 
          to="/" 
          label="Home" 
          icon={<HomeIcon isActive={pathname === '' || pathname === 'home'} />} 
          isActive={pathname === '' || pathname === 'home'}
          searchParams={searchParams}
        />
        <NavItem 
          to="/services" 
          label="Services" 
          icon={<ServicesIcon isActive={pathname === 'services'} />} 
          isActive={pathname === 'services'}
          searchParams={searchParams}
        />
        <NavItem 
          to="/chatbot" 
          label="AI Chatbot" 
          icon={<ChatbotIcon isActive={pathname === 'chatbot'} />} 
          isActive={pathname === 'chatbot'}
          searchParams={searchParams}
        />
        <NavItem 
          to="/account" 
          label="Account" 
          icon={<AccountIcon isActive={pathname === 'account'} />} 
          isActive={pathname === 'account'}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
};

export default Nav;
