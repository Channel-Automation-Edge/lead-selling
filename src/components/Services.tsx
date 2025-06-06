import React from 'react';
import { useAppContext } from '@/context/AppContext';
import BlurFade from './ui/blur-fade';
import IconComponent from '@/hooks/IconComponent';

interface Service {
  id: string;
  services: { name: string };
}

interface ServicesProps {
  services: Service[];
  handleServiceSelect: (service: Service) => void;
}

const Services: React.FC<ServicesProps> = ({ services, handleServiceSelect }) => {

  const { contractor } = useAppContext();

  const accent_rgba = contractor.colors.accent_rgba || '0 10px 25px -6px rgba(0, 0, 0, 0.1)';

  return (
    <div>
      <div className="space-y-8">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-[20px]" style={{ marginTop: '15px', width: '100%' }}>
          {services.length > 0 ? (
            services.map((service, index) => (
              <BlurFade
                key={service.id}
                delay={(index + 1) * 0.2} // Incremental delay for staggered effect
                yOffset={0}
                className="flex flex-row sm:flex-col items-center justify-start sm:justify-center w-full sm:w-[210px] h-[80px] sm:h-[156px] border border-transparent rounded-xl shadow-md p-4 hover:scale-100 sm:hover:scale-105 transform transition-transform bg-white"
                onClick={() => handleServiceSelect(service)}
                style={{
                  boxShadow: 'rgba(0, 0, 0, 0.07) 0px 22px 30px -6px',
                  transition: 'box-shadow 0.3s ease',
                  borderColor: 'rgba(157, 176, 197, 0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = accent_rgba + ' 0px 10px 25px -6px ';
                  e.currentTarget.style.borderColor = accent_rgba;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.07) 0px 10px 25px -6px';
                  e.currentTarget.style.borderColor = 'rgba(157, 176, 197, 0.25)';
                }}
              >
                <IconComponent name={service.services.name} className="w-14 h-14" />
                <span className="text-gray-800 text-base font-medium text-left sm:text-center">{service.services.name}</span>
              </BlurFade>
            ))
          ) : (
            <BlurFade delay={3 * 0.15} yOffset={0} className="text-center text-gray-500 mt-8">
              Sorry, we don't serve your area at the moment.
            </BlurFade>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
