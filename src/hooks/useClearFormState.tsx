import { useAppContext } from '@/context/AppContext';
 // Ensure AppContext is correctly imported

const useClearFormState = () => {

  const { setUser, setSelectedService, services } = useAppContext();

  const clearFormState = () => {
    setUser(prev => ({
      ...prev,
      firstname: null,
      lastname: null,
      address1: null,
      address2: null,
      city: null,
      email: null,
      phone: null,
      state: null,
      userNs: null,
      market: null,
      timezone: null,
    }));
    setSelectedService(null);

    if (services.length === 1) {
      setSelectedService(services[0]);
    }
  };

  return clearFormState;
};

export default useClearFormState;
