import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Stepper from '../ui/Stepper';
import { useAppContext } from '@/context/AppContext';
import useFormPersistence from '@/hooks/useFormPersistence';
import useClearFormState from '@/hooks/useClearFormState';
import Step1Selection from './Step1Selection';
import ProgressBar from '../ui/ProgressBar';
import Step1Info from './UserInfo';
import Step2Schedule from './DateAndTime';
import Summary from './Summary';

const ParentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const clearFormState = useClearFormState();
  // const resetDatabase = useResetDatabase();

  const { setForm, contractor, services, setSelectedService } = useAppContext();
  // Determine the initial step based on the number of services
  const initialStep = services.length === 1 ? 2 : 1;
  const [currentStep, setCurrentStep, resetCurrentStep] = useFormPersistence('formStep', initialStep);

  const progress = (currentStep ) * 25;
  const [slug, setSlug] = useState('');

  // If there is only one service, preselect it
  useEffect(() => {
    if (services.length === 1) {
      setSelectedService(services[0]);

      // If we are on step 1 and there is only one service, move to step 2
      if (currentStep === 1) {
        setCurrentStep(2)
      }
    }
  }, [services, setSelectedService]);
  
  // Set the slug
  useEffect(() => {
    if (contractor) {
      setSlug(contractor.slug);
    }
  }, [contractor]);

  const navigateWithParams = (path: string) => {
    const currentParams = new URLSearchParams(location.search);
    navigate(`${path}?${currentParams.toString()}`);
  };

  // Scroll to top when the step changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Use smooth scrolling
    });
  }, [currentStep]);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleReset = async () => {
    resetCurrentStep();
    clearFormState();
    // await resetDatabase();
  };

  const handleBackStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitted = () => {
    navigateWithParams(`/summary/${slug}`);
    resetCurrentStep();

    setForm(prev => ({ ...prev, formId: null })); 
    localStorage.removeItem('formID');
  };

  const avatar = contractor.content.avatar || null;

  return (
    <div className=''>
      <div className="mx-auto max-w-screen-xl px-4 pb-2 custom-smallest:pb-3 small-stepper:pb-3 sm:pb-4 md:pb-6 pt-2 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <Stepper currentStep={currentStep} />
        </div>
      </div>
      <div className={`mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ${contractor.content.avatar ? 'py-6' : 'py-0'} relative`}>
        <div className="flex justify-center">
          <div className="w-[600px]">
            <ProgressBar progress={progress} />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {contractor.content.avatar && (
            <img
            src={avatar}
            alt="Avatar"
            className="w-12 h-12 custom-smallest:w-14 custom-smallest:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-100 object-cover"
          />
          )}
          </div>
        </div>
      </div>
      <div>
        {currentStep === 1 && <Step1Selection onNext={handleNextStep} />}
        {currentStep === 2 && <Step1Info onNext={handleNextStep} onReset={handleReset} onBack={handleBackStep} />}
        {currentStep === 3 && <Step2Schedule onNext={handleNextStep} onReset={handleReset} onBack={handleBackStep} />}
        {currentStep === 4 && <Summary onNext={handleSubmitted} onReset={handleReset} onBack={handleBackStep} />}
      </div>
    </div>
  );
};

export default ParentForm;
