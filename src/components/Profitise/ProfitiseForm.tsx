import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import Step1Info from '../forms/UserInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import useClearFormState from '@/hooks/useClearFormState';
import Step1 from './Step1';
import Stepper2 from '../ui/Stepper2';
import SummaryProfitise from './SummaryProfitise';
import SubService from './SubService';
import OtherServices from './OtherServices';
import ScheduleWithTimezone from './ScheduleWithTimezone';
import AppointmentPreferences from './AppointmentPreferences';

const ProfitiseForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { setForm, contractor, setSelectedService, setUser, form, selectedService } = useAppContext();
  const navigateWithParams = (path: string) => {
    const currentParams = new URLSearchParams(location.search);
    navigate(`${path}?${currentParams.toString()}`);
  };
  const clearFormState = useClearFormState();
  const params = new URLSearchParams(location.search);
  const test = params.get('test');

  // on load, set current step based on url parameter
  useEffect(() => {
    if (test === 'B' || test === 'b') {
      setCurrentStep(1);
    } else {
      setCurrentStep(2);
    }
  }, [test]);

  const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  useEffect(() => {
    const setInitialFormState = async () => {
      let formId = form.formId;

      if (!formId) {
        const dateTime = new Date().toISOString().replace(/[-:.T]/g, '').slice(0, 14);
        const randomString = generateRandomString(6);
        formId = `${contractor.id}-${dateTime}-${randomString}`;
      }

      setForm(prevForm => ({
        ...prevForm,
        formId: formId || null,
      }));
    };
    setInitialFormState();
  }, [contractor, setForm]);


  const capitalizeWords = (str: string | null) => {
    if (!str) return '';
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  // On load, clear form state and initialize user, form, and service data from url parameters
  useEffect(() => {
    const setInitialFormState = async () => {

      setUser(prevUser => ({
        ...prevUser,
        userNs: params.get('user_ns'),
        market: params.get('market'),
        firstname: capitalizeWords(params.get('firstname')),
        lastname: capitalizeWords(params.get('lastname')),
        email: params.get('email'),
        phone: params.get('phone'),
        zip: params.get('zip'),
        address1: capitalizeWords(params.get('address1')),
        address2: capitalizeWords(params.get('address2')),
        city: capitalizeWords(params.get('city')),
        state: params.get('state'),
      }));
    }
    setInitialFormState();
  }, [ location.search ]);
  
  const [slug, setSlug] = useState('');
  // Set slug
  useEffect(() => {
    if (contractor) {
      setSlug(contractor.slug);
    }
  }, [contractor]);

  const handleNext = () => {
    if (currentStep === 4) {
      if (selectedService?.service_id === 17) {
        setCurrentStep(5);
      }
      else {
        setCurrentStep(6);
      }
    }
    else {
      setCurrentStep(currentStep + 1);
    }
      
    
  }

  const handleSubmit = () => {
    navigateWithParams(`/summary-inbound/${slug}`);
    clearFormState();
    localStorage.setItem('tempFormID', form.formId || '');
    setForm(prev => ({ ...prev, formId: null })); 
    localStorage.removeItem('formID');
  };

  const handleBack = () => {
    if (currentStep === 3) {
      if (test === 'B' || test === 'b') {
       setCurrentStep(1);
      }
      else {
        setCurrentStep(2);
      }
    }
    else if (currentStep === 4) {
      if (selectedService?.service_id === 17) {
        setCurrentStep(3);
      }
      else {
        setCurrentStep(2);
      }
    }
    else if (currentStep === 6) {
      if (selectedService?.service_id === 17) {
        setCurrentStep(5);
      }
      else {
        setCurrentStep(4);
      }
    }
    else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    if (test === 'B' || test === 'b') {
      setCurrentStep(1);
    } else {
      setCurrentStep(2);
    }
    setSelectedService(null);
    // clear
  }

  // Scroll to top when the step changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Use smooth scrolling
    });
  }, [currentStep]);

  const avatar = contractor.content.avatar || null;

  if (!contractor) {
    return null;
  }

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 pb-2 custom-smallest:pb-3 small-stepper:pb-3 sm:pb-4 md:pb-6 pt-2 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <Stepper2 currentStep={currentStep} />
        </div>
      </div>
      <div className={`mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ${contractor.content.avatar ? 'py-6' : 'py-0'} relative`}>
        <div className="flex justify-center">
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {contractor.content.avatar && (
            <img
            src={avatar}
            alt="Avatar"
            className="w-12 h-12 custom-smallest:w-14 custom-smallest:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-200 object-cover"
          />
          )}
          </div>
        </div>
      </div>
      {currentStep === 1 && <Step1 onNext={(nextStep) => setCurrentStep(nextStep)} /> }
      {currentStep === 2 && <OtherServices onNext={(nextStep) => setCurrentStep(nextStep)} />}
      {currentStep === 3 && <SubService onNext={handleNext} onReset={handleReset} onBack={handleBack} />}
      {currentStep === 4 && <Step1Info onNext={handleNext} onReset={handleReset} onBack={handleBack} />}
      {currentStep === 5 && <AppointmentPreferences onNext={handleNext} onReset={handleReset} onBack={handleBack} />}
      {currentStep === 6 && <ScheduleWithTimezone onNext={handleNext} onBack={handleBack} onReset={handleReset} />}
      {currentStep === 7 && <SummaryProfitise onNext={handleSubmit} onReset={handleReset} onBack={handleBack} />}
    </div>
  )
}

export default ProfitiseForm
