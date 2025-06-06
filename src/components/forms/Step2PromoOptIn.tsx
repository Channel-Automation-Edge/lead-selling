"use client";
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';

import NavButtons from '../ui/navButtons';

// Define props interface
interface Step2PromoOptInProps {
  onNext: () => void;
  onBack: () => void;
  onReset: () => void;
}

const Step2PromoOptIn: React.FC<Step2PromoOptInProps> = ({ onNext, onBack, onReset }) => {
  const { setForm, contractor } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const accent_rgba = contractor.colors.accent_rgba || '0 10px 25px -6px rgba(0, 0, 0, 0.1)';

  const handleBack = () => {
    onBack();
  };

  const handleReset = () => {
    onReset();
  };

  const handleSelect = async (promo: string) => {
    setLoading(true); // Show spinner

    setForm((prevForm) => ({
      ...prevForm,
      promo: promo,
    }));
    localStorage.setItem('promo', JSON.stringify(promo));

    setLoading(false); // Hide spinner
    onNext();
  };

  return (
    <div className="container-cards">
      <NavButtons handleBack={handleBack} handleReset={handleReset} />

      <div className="space-y-8">
        <div className='flex justify-center text-center mb-8'>
          <div className="max-w-[40rem] text-center">
            <h1 className="heading-form">
              Don't miss out—claim your <span className="text-accentColor">special offer</span>
            </h1> 
          </div>
        </div>

        <div className="mt-12 flex flex-col h-full">
          <div className="container-cards">
            {contractor.promos.map((promo: string) => (
              <button
                key={promo}
                type="button"
                className="cards-button"
                onClick={() => handleSelect(promo)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = accent_rgba + ' 0px 10px 25px -6px ';
                  e.currentTarget.style.borderColor = accent_rgba;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.07) 0px 10px 25px -6px';
                  e.currentTarget.style.borderColor = 'rgba(157, 176, 197, 0.25)';
                }}
              >
                <span className="cards-text">{promo}</span>
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

export default Step2PromoOptIn;
