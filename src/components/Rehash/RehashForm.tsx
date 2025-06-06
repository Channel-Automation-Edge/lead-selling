import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import Step2Schedule from '../forms/DateAndTime';
import Step1Info from '../forms/UserInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import RehashSummary from './RehashSummary';
import NavBar2 from '../NavBar2';

const RehashForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { contractor, setUser } = useAppContext();
  const navigateWithParams = (path: string) => {
    const currentParams = new URLSearchParams(location.search);
    navigate(`${path}?${currentParams.toString()}`);
  };
  const params = new URLSearchParams(location.search);
  const step = params.get("step");

  // on load, set current step based on url parameter
  useEffect(() => {
    if (step === "request") {
      setCurrentStep(1);
    } else {
      setCurrentStep(2);
    }
  }, [step]);

  const capitalizeWords = (str: string | null) => {
    if (!str) return "";
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // On load, clear form state and initialize user, form, and service data from url parameters
  useEffect(() => {
    const setInitialFormState = async () => {
      setUser((prevUser) => ({
        ...prevUser,
        userNs: params.get("user_ns"),
        market: params.get("market"),
        firstname: capitalizeWords(params.get("firstname")),
        lastname: capitalizeWords(params.get("lastname")),
        email: params.get("email"),
        phone: params.get("phone"),
        zip: params.get("zip"),
        address1: capitalizeWords(params.get("address1")),
        address2: capitalizeWords(params.get("address2")),
        city: capitalizeWords(params.get("city")),
        state: params.get("state"),
      }));

      // setForm((prevForm) => ({
      //   ...prevForm,
      //   promo: params.get("promo"),
      //   date: params.get("adate"),
      //   time: params.get("atime"),
      //   timezone: contractor?.timezone[0],
      // }));
    };
    setInitialFormState();
  }, [location.search]);

  // useEffect(() => {
  //   setForm((prevForm) => ({
  //     ...prevForm,
  //     serviceSpecification: params.get("service_specification"),
  //   }));
  // }, [location.search, setForm]);

  const [slug, setSlug] = useState("");
  // Set slug
  useEffect(() => {
    if (contractor) {
      setSlug(contractor.slug);
    }
  }, [contractor]);

  const handleUpdate = () => {
    setCurrentStep(1);
  };

  const handleSchedule = () => {
    setCurrentStep(2);
  };

  const handleInfo = () => {
    setCurrentStep(3);
  };

  const handleTest = () => {
    console.log("");
  };

  const handleSubmit = () => {
    navigateWithParams(`/rehash-summary/${slug}`);
  };

  // Scroll to top when the step changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Use smooth scrolling
    });
  }, [currentStep]);

  if (!contractor) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar2 />
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12 space-y-12 sm:space-y-20 lg:space-y-24">
        <div>
          {currentStep === 1 && (
            <RehashSummary
              onInfo={handleInfo}
              onSchedule={handleSchedule}
              onSubmit={handleSubmit}
            />
          )}
          {currentStep === 2 && (
            <Step2Schedule
              onNext={handleUpdate}
              onBack={handleTest}
              onReset={handleTest}
            />
          )}
          {currentStep === 3 && (
            <Step1Info
              onNext={handleUpdate}
              onBack={handleTest}
              onReset={handleTest}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default RehashForm
