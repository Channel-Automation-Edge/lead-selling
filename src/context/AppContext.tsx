import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect, useContext } from 'react';

interface UserData {
  firstname: string | null;
  lastname: string | null;
  zip: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  email: string | null;
  phone: string | null;
  state: string | null;
  userNs: string | null;
  market: string | null;
}

export interface Appointment {
  contractor_id: string;
  date: string;
  time: string;
}

interface FormData {
  formId?: string | null;
  appointments?: Appointment[];
  contactPreferences?: string[];
  generalOptIn?: boolean;
  termsAndPrivacyOptIn?: boolean;
  promo?: string;
  serviceSpecification?: string;
  date?: string;
  time?: string;
  timezone?: string;
  timezoneAbbr?: string;  
}

interface AppContextType {
  cookiesAccepted: string[];
  cookieConsentId: string;
  user: UserData;
  form: FormData;
  selectedService: any;
  contractor: any;
  services: any;
  locations: any;
  timezoneAbbr: string;
  matchingContractors: any;

  setCookiesAccepted: Dispatch<SetStateAction<string[]>>;
  setCookieConsentId: Dispatch<SetStateAction<string>>;
  setUser: Dispatch<SetStateAction<UserData>>;
  setForm: Dispatch<SetStateAction<FormData>>;
  setSelectedService: Dispatch<SetStateAction<any>>;
  setContractor: Dispatch<SetStateAction<any>>;
  setServices: Dispatch<SetStateAction<any>>;
  setLocations: Dispatch<SetStateAction<any>>;
  setTimezoneAbbr: Dispatch<SetStateAction<string>>;
  setMatchingContractors: Dispatch<SetStateAction<any>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

// Create the provider component
export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {

  const [cookiesAccepted, setCookiesAccepted] = useState<string[]>([]);
  const [cookieConsentId, setCookieConsentId] = useState<string>('');
  
  const [user, setUser] = useState<UserData>({
    firstname: null,
    lastname: null,
    zip: null,
    address1: null,
    address2: null,
    city: null,
    email: null,
    phone: null,
    state: null,
    userNs: null,
    market: null, 
  });

  const [form, setForm] = useState<FormData>({
    formId: undefined,
    appointments: [],
    termsAndPrivacyOptIn: false,
  });

  const [selectedService, setSelectedService] = useState<any>(null);
  const [contractor, setContractor] = useState<any>(null);
  const [services, setServices] = useState<any>(null);
  const [locations, setLocations] = useState<any>(null);
  const [timezoneAbbr, setTimezoneAbbr] = useState<string>('');
  const [matchingContractors, setMatchingContractors] = useState<any>(null);

  // Initialize cookiesAccepted from local storage
  useEffect(() => {
    const storedCookies = localStorage.getItem('cookiesAccepted');
    const storedCookieConsentId = localStorage.getItem('cookieConsentId');
    if (storedCookies) {
      setCookiesAccepted(JSON.parse(storedCookies));
    }
    if (storedCookieConsentId) {
      setCookieConsentId(storedCookieConsentId);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        cookiesAccepted,
        cookieConsentId,
        user,
        form,
        selectedService,
        contractor,
        locations,
        timezoneAbbr,
        services,
        matchingContractors,
        setMatchingContractors,
        setCookiesAccepted,
        setCookieConsentId,
        setUser,
        setForm,
        setSelectedService,
        setContractor,
        setLocations,
        setServices,
        setTimezoneAbbr,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
