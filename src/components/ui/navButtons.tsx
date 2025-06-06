import React from 'react';
import BackButton from '@/components/ui/backButton';
import ResetButton from '@/components/ui/resetButton';

interface NavButtonsProps {
  handleBack: () => void;
  handleReset: () => void;
}

const NavButtons: React.FC<NavButtonsProps> = ({ handleBack, handleReset }) => {

  return (
    <div>
      <div className={`absolute top-[-102px] custom-smallest:top-[-110px] small-stepper:top-[-115px] sm:top-[-121px] md:top-[-137px] left-0 w-full flex justify-between p-4`}>
          <BackButton onClick={handleBack} />
          <ResetButton onClick={handleReset} /> 
        </div>
    </div>
  );
};

export default NavButtons;
