import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Confirmation from "./Confirmation";
import { useNavigate, useLocation } from "react-router-dom";
import useClearFormState from "@/hooks/useClearFormState";
import ProgressBar from "./ui/ProgressBar";
import ConfirmZip from "./forms/ConfirmZip";
import MatchingContractors from "./forms/MatchingContractors";

const MainForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { setForm, contractor, setSelectedService, setUser, form, services } =
    useAppContext();
  const navigateWithParams = (path: string) => {
    const currentParams = new URLSearchParams(location.search);
    navigate(`${path}?${currentParams.toString()}`);
  };
  const clearFormState = useClearFormState();
  const params = new URLSearchParams(location.search);
  const serviceId = params.get("service");
  const step = params.get("step");
  const progress = (currentStep + 1) * 33; // 3 steps total now

  // on load, set current step based on url parameter
  useEffect(() => {
    if (step === "request") {
      setCurrentStep(2);
    } else {
      setCurrentStep(0); // Default to ZIP confirmation
    }
  }, [step]);

  // Service selection logic with fallbacks
  useEffect(() => {
    if (services?.length) {
      let selectedService = null;
      const numericServiceId = serviceId ? parseInt(serviceId, 10) : null;

      // Fallback logic
      if (!numericServiceId) {
        // Case 1: No service ID in URL - use first service
        selectedService = services[0];
      } else {
        // Case 2: Try to find matching service
        selectedService =
          services.find(
            (service: any) => service.service_id === numericServiceId
          ) || services[0]; // Fallback to first service if not found
      }

      if (selectedService) {
        console.log("Setting service:", selectedService);
        setSelectedService(selectedService);
      } else {
        console.error(
          `Service with ID ${numericServiceId} not found. Available services:`,
          services
        );
      }
    }
  }, [serviceId, services, setSelectedService]);

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

      setForm((prevForm) => ({
        ...prevForm,
        promo: params.get("promo") || undefined,
        date: params.get("adate") || undefined,
        time: params.get("atime") || undefined,
        timezone: contractor?.timezone[0] || undefined,
      }));
    };
    setInitialFormState();
  }, [location.search]);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      serviceSpecification: params.get("service_specification") || undefined,
    }));
  }, [location.search, setForm]);

  const [slug, setSlug] = useState("");
  // Set slug
  useEffect(() => {
    if (contractor) {
      setSlug(contractor.slug);
    }
  }, [contractor]);

  const handleSchedule = () => {
    setCurrentStep(2);
  };

  const handleInfo = () => {
    setCurrentStep(3);
  };

  const handleService = () => {
    setCurrentStep(4);
  };
  
  const handleZipConfirmed = () => {
    setCurrentStep(1);
  };
  
  const handleContractorsSelected = () => {
    setCurrentStep(2);
  };

  const handleSubmit = () => {
    navigateWithParams(`/summary-inbound/${slug}`);
    clearFormState();
    localStorage.setItem("tempFormID", form.formId || "");
    setForm((prev) => ({ ...prev, formId: null }));
    localStorage.removeItem("formID");
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
    <div>
      <div
        className={`mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 relative mt-4`}
      >
        <div className="flex justify-center">
          <div className="w-[600px]">
            <ProgressBar progress={progress} />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img
              src="https://project-starfish.s3.us-east-005.backblazeb2.com/avatar.jpg"
              alt="Avatar"
              className="w-12 h-12 custom-smallest:w-14 custom-smallest:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-100 object-cover"
            />
          </div>
        </div>
      </div>
      {currentStep === 0 && (
        <ConfirmZip onNext={handleZipConfirmed} />
      )}
      {currentStep === 1 && (
        <MatchingContractors onNext={handleContractorsSelected} />
      )}
      {currentStep === 2 && (
        <Confirmation
          onInfo={handleInfo}
          onSchedule={handleSchedule}
          onSubmit={handleSubmit}
          onService={handleService}
        />
      )}
    </div>
  );
};

export default MainForm;
