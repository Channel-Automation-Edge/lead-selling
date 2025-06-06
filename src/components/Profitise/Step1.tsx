import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import IconComponent from '@/hooks/IconComponent';

// Define props interface
interface Step1Props {
  onNext: (nextStep: number) => void; // Updated to accept step number
}

const Step1: React.FC<Step1Props> = ({ onNext }) => { 
  const { contractor, setSelectedService, services } = useAppContext(); 
  const [loading, setLoading] = useState<boolean>(false);
  const params = new URLSearchParams(window.location.search);
  const initial = params.get('firstname');
  const accent_rgba = contractor.colors.accent_rgba || '0 10px 25px -6px rgba(0, 0, 0, 0.1)';

  const capitalizeFirstLetter = (string: string | null) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSolar = () => {
    setLoading(true);
    // go through services and find the object where service_id === 17, and save that whole object to selectedService
    const solarService = services.find((service: any) => service.service_id === 17);
    setSelectedService(solarService);
    onNext(3); // Pass step 3 to parent
    setLoading(false);
  }

  const handleOther = () => {
    setLoading(true);
    // clear selectedService
    setSelectedService(null);
    onNext(2); // Pass step 2 to parent
    setLoading(false);
  }

  const firstname = capitalizeFirstLetter(initial) || 'there';

  return (
    <div className="container-form">
      <div className="space-y-8">
        <div className='flex justify-center text-center mb-8 px-4'>
          <div className="max-w-[60rem] text-center">
            <h1 className="heading-form">
              Hi <span className="text-accentColor">{firstname}</span>! Tell us what you're looking for 
            </h1>
          </div>
        </div>

        <div className="mb-12 px-4">
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8">
            <button
              type="button"
              className='cards-button hover:border-accentColor w-full sm:w-[230px] '
              onClick={handleSolar}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `${accent_rgba} 0px 10px 25px -6px`;
                e.currentTarget.style.borderColor = accent_rgba;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.07) 0px 10px 25px -6px';
                e.currentTarget.style.borderColor = 'rgba(157, 176, 197, 0.25)';
              }}
            >
              <IconComponent name={'Solar'} className="w-14 h-14" />
              <span className="cards-text text-center ">
                Interested in <span className="text-accentColor">Solar</span> projects
              </span>
            </button>

            <button
              type="button"
              className='cards-button hover:border-accentColor w-full sm:w-[230px]'
              onClick={handleOther}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `${accent_rgba} 0px 10px 25px -6px`;
                e.currentTarget.style.borderColor = accent_rgba;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.07) 0px 10px 25px -6px';
                e.currentTarget.style.borderColor = 'rgba(157, 176, 197, 0.25)';
              }}
            >
              <IconComponent name={'House'} className="w-14 h-14" />
              <span className="cards-text text-center">
                See Other <span className="text-accentColor">Home Improvement</span> projects
              </span>
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center pt-20">
            <div className="animate-spin h-6 w-6 border-2 border-accentColor border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step1;