import React, { useRef, useState } from 'react';
import IconComponent from '@/hooks/IconComponent';

interface ServiceItem {
  id: number;
  service_id: number;
  services: {
    name: string;
  };
}

interface ServiceIconSelectProps {
  services: ServiceItem[];
  handleServiceSelect: (service: ServiceItem) => void;
}

const ServiceIconSelect: React.FC<ServiceIconSelectProps> = ({ services, handleServiceSelect }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  // Function to scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Handle scroll events to determine arrow visibility
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="w-full relative">
      {/* Left navigation arrow */}
      {showLeftArrow && (
        <button 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
          onClick={scrollLeft}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      
      {/* Scrollable container */}
      <div 
        className="w-full overflow-x-auto scrollbar-hide" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <div className="flex flex-nowrap gap-1 sm:gap-2 md:gap-4">
          {services && services.length > 0 ? (
            services.map((service: ServiceItem) => (
              <div
                key={service.id}
                className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-auto sm:w-28 md:w-32 pb-2 cursor-pointer group"
                onClick={() => handleServiceSelect(service)}
              >
                <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl hover:scale-110 transform transition-all duration-300 mb-2 pl-2">
                  <IconComponent 
                    name={service.services?.name} 
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-gray-700 group-hover:text-accentColor" 
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-700 text-center line-clamp-2 group-hover:text-accentColor transition-colors duration-300">
                  {service.services?.name}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4 w-full">
              Sorry, we don't serve your area at the moment.
            </div>
          )}
        </div>
      </div>

      {/* Right navigation arrow */}
      {showRightArrow && (
        <button 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
          onClick={scrollRight}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ServiceIconSelect;