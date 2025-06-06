import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';

import NavButtons from '../ui/navButtons';
import ResetButton from '../ui/resetButton';
import SolarPanel from '../icons/SolarPanel';
import SolarAccessories from '../icons/SolarAccessories';
import SolarWall from '../icons/SolarWall';

// Define props interface
interface SubServiceProps {
  onNext: () => void;
  onBack: () => void;
  onReset: () => void;
}

// Component mapping object
const specificationComponents = {
  'Solar Power Wall': SolarWall,
  'Solar Panel': SolarPanel,
  'Solar Accessories': SolarAccessories,
};

const SubService: React.FC<SubServiceProps> = ({ onNext, onBack, onReset }) => {
  const { setForm, contractor, services, selectedService } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const accent_rgba = contractor.colors.accent_rgba || '0 10px 25px -6px rgba(0, 0, 0, 0.1)';

  const capitalizeWords = (str: string | null) => {
    if (!str) return '';
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };
  
  // Get firstname from URL parameters
  const params = new URLSearchParams(window.location.search);
  const firstname = capitalizeWords(params.get('firstname'));

  // Determine the heading text based on conditions
  let headingText;
  if (services.length === 1) {
    headingText = firstname ? `Hi, ${firstname}! ` : "Hi there! ";
  } else {
    headingText = "Great! ";
  }

  const handleBack = () => {
    onBack();
  };

  const handleReset = () => {
    onReset();
  };

  const handleSelect = async (spec: string) => {
    setLoading(true); // Show spinner

    setForm((prevForm) => ({
      ...prevForm,
      serviceSpecification: spec,
    }));

    setLoading(false); // Hide spinner
    onNext();
  };

  const hasAvatar = contractor?.content?.avatar;

  // Check if we have valid specifications
  if (!selectedService?.specifications?.length) {
    return <div>No specifications available</div>;
  }

  return (
    <div className="container-form">
      {
        services.length > 1 ? (
          <NavButtons handleBack={handleBack} handleReset={handleReset} />
        ) : (
          <div
            className={`absolute ${
              hasAvatar
                ? 'top-[-102px] custom-smallest:top-[-110px] small-stepper:top-[-115px] sm:top-[-121px] md:top-[-137px]'
                : 'top-[-54px] custom-smallest:top-[-61px] small-stepper:top-[-67px] sm:top-[-73px] md:top-[-90px]'
            } right-0 w-full flex justify-end p-4`}
          >
            <ResetButton onClick={handleReset} />
          </div>
        )
      }

      <div className="space-y-8">
        <div className='flex justify-center text-center mb-8'>
          <div className="max-w-[40rem] text-center">
            <h1 className="heading-form"> {headingText}
            Let us know <span className="text-accentColor">what you need </span>—choose one of the options below
            </h1> 
          </div>
        </div>

        <div className="mt-12 flex flex-col h-full">
          <div className="container-cards">
            {selectedService.sub_services.map((spec: string) => {
              const SpecificationIcon = specificationComponents[spec as keyof typeof specificationComponents];
              
              return (
                <button
                  key={spec}
                  type="button"
                  className="cards-button plausible-event-name=form_step_complete plausible-event-form_step=2_specification"
                  onClick={() => handleSelect(spec)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `${accent_rgba} 0px 10px 25px -6px`;
                    e.currentTarget.style.borderColor = accent_rgba;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.07) 0px 10px 25px -6px';
                    e.currentTarget.style.borderColor = 'rgba(157, 176, 197, 0.25)';
                  }}
                >
                  {SpecificationIcon && <SpecificationIcon />}
                  <span className="cards-text">{spec}</span>
                </button>
              );
            })}
          </div>
          {loading && (
            <div className="flex justify-center pt-20">
              <div className="animate-spin h-6 w-6 border-2 border-accentColor border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubService;
