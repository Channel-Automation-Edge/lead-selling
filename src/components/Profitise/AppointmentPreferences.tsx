import React, { useState } from 'react';
import NavButtons from '../ui/navButtons';
import { useAppContext } from '@/context/AppContext';


interface AppointmentPreferencesProps {
  onNext: () => void;
  onBack: () => void;
  onReset: () => void;
}

const preferenceOptions = [
  { 
    label: 'Virtual', 
    value: 'virtual',
    icon: '/images/virtual.svg' 
  },
  { 
    label: 'In-Person', 
    value: 'inPerson',
    icon: '/images/in-person.svg' 
  },
  { 
    label: 'No preference', 
    value: 'noPreference',
    icon: '/images/none.svg' 
  }
];

const AppointmentPreferences: React.FC<AppointmentPreferencesProps> = ({ onNext, onBack, onReset }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { contractor } = useAppContext();
  const accent_rgba = contractor.colors.accent_rgba || '0 10px 25px -6px rgba(0, 0, 0, 0.1)';

  const handleSelect = async (preferenceValue: string) => {
    setLoading(true);
    
    // Save to localStorage
    localStorage.setItem('appointmentPreference', preferenceValue);

    setLoading(false);
    onNext();
  };

  return (
    <div className="container-form">
      <NavButtons handleBack={onBack} handleReset={onReset} />

      <div className="space-y-8">
        <div className='flex justify-center text-center mb-8'>
          <div className="max-w-[40rem] text-center">
            <h1 className="heading-form">
              How would you prefer 
              <span className="text-accentColor"> your appointment?</span>
            </h1> 
          </div>
        </div>

        <div className="mt-12 flex flex-col h-full">
          <div className="container-cards">
            {preferenceOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className="cards-button plausible-event-name=form_step_complete plausible-event-form_step=2_specification"
                onClick={() => handleSelect(option.value)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `${accent_rgba} 0px 10px 25px -6px`;
                  e.currentTarget.style.borderColor = accent_rgba;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.07) 0px 10px 25px -6px';
                  e.currentTarget.style.borderColor = 'rgba(157, 176, 197, 0.25)';
                }}
              >
                <img 
                  src={option.icon} 
                  alt={option.label} 
                  className="w-14 h-14 mb-4" 
                />
                <span className="cards-text">{option.label}</span>
              </button>
            ))}
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

export default AppointmentPreferences;