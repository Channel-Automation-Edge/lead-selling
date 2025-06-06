import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import RequestQuote from './pages/RequestQuote';
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { useEffect, useState } from 'react';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import "vanilla-cookieconsent/dist/cookieconsent.css";
import { central } from '@/lib/supabaseClient';
import { useAppContext } from '@/context/AppContext';
import ThankYou from './pages/ThankYou';
import Inbound from './pages/Inbound';
import InboundThankYou from './pages/InboundThanksYou';
import ConfirmationForm from './pages/ConfirmationForm';
import ConfirmationSummary from './pages/ConfirmationSummary';
import RehashPage from './pages/RehashPage';
import RehashThankYou from './pages/RehashThankYou';
import RehashPage2 from './pages/RehashPage2';
import RehashForm from './components/Rehash/RehashForm';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams(location.search);
  const companyId = params.get('company_id');
  const { setContractor, setServices, contractor, services, form, user, selectedService, setUser } = useAppContext();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      const storedContractor = localStorage.getItem('contractor');
      const storedServices = localStorage.getItem('services');

      if (storedContractor && storedServices) {
        // Load from local storage
        setContractor(JSON.parse(storedContractor));
        setServices(JSON.parse(storedServices));
        setLoading(false);
      } 
      // Fetch contractor
      console.log('Fetching contractor data...');
      try {
        const { data, error } = await central
          .from('contractors')
          .select('*')
          .eq('id', companyId)
          .single();

        if (error) {
          return;
        }
        if (data) {
          console.log('Contractor data fetched:', data);
          setContractor(data);
          localStorage.setItem('contractor', JSON.stringify(data));

          // Fetch services
          const { data: servicesData, error: servicesError } = await central
          .from('contractor_services')
          .select('*, services(name, national_avg, roi)')
          .eq('contractor_id', companyId);

          if (servicesError) {
            console.error('Error fetching services:', servicesError);
          } else {
            setServices(servicesData || []);
            localStorage.setItem('services', JSON.stringify(servicesData || []));
            console.log('Services fetched successfully');
          }


          setLoading(false);
        }
      } catch (err) {
        console.error('Unexpected error fetching data:', err);
        return;
      }
    };
    fetchInitialData();
  }, []);

  // Update document title and favicon
  useEffect(() => {
    if (contractor) {
      // Update the document title
      document.title = contractor.name;

      // Update the favicon
      const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
      if (favicon) {
        favicon.href = contractor.favicon;
      } else {
        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.href = contractor.favicon;
        document.head.appendChild(newFavicon);
      }
    }
  }, [contractor]);

  // Log data
  useEffect(() => {
    console.log('contractor', contractor);
    console.log('services', services);
    console.log('form', form);
    console.log('user', user);
    console.log('selected service', selectedService);
  }, [contractor, services, form, user, selectedService]);

  // Set custom colors from contractor data
  useEffect(() => {
    if (contractor && contractor.colors) {
      const accentColor = contractor.colors.accent || '#FA5100'; 
      const light = contractor.colors.light || '#fff1eb';
      const dark = contractor.colors.dark || '#d84a05';
      const darker = contractor.colors.darker || '#ab3c06';
      document.documentElement.style.setProperty('--light', light);
      document.documentElement.style.setProperty('--accent', accentColor);
      document.documentElement.style.setProperty('--darker', darker);
      document.documentElement.style.setProperty('--dark', dark);
    }
  }, [contractor]);

  // Fetch data from url parameters and initialze user data
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const firstname = params.get('firstname');
    const lastname = params.get('lastname');
    const zip = params.get('zip');
    const address1 = params.get('address1');
    const address2 = params.get('address2');
    const city = params.get('city');
    const email = params.get('email');
    const phone = params.get('phone');
    const state = params.get('state');
    const userNs = params.get('user_ns');
    const market = params.get('market');
    setUser({
      firstname,
      lastname,
      zip,
      address1,
      address2,
      city,
      email,
      phone,
      state,
      userNs,
      market,
    });
  }, [location]);

  // Render nothing while loading
  if (loading || !contractor || !services || !user) {
    return null;
  }

  return (
    <>
      <Routes>
        <Route path='/rehash2/:slug/' element={<RehashPage />} />
        <Route path='/rehash/:slug/' element={<RehashPage2 />} />
        <Route path='/rehash-form/:slug/' element={<RehashForm />} />
        <Route path='/rehash-summary/:slug/' element={<RehashThankYou />} />

        <Route path='/' element={<Home />} />
        <Route path='/:slug' element={<Home />} />
        <Route path='/inbound/:slug' element={<Inbound />} />
        <Route path='/request-quotes/:slug' element={<RequestQuote />} />
        <Route path='/cookie-policy/:slug' element={<CookiePolicy />} />
        <Route path='/privacy-policy/:slug' element={<PrivacyPolicy />} />
        <Route path='/summary/:slug' element={<ThankYou />} />
        <Route path='/summary-inbound/:slug' element={<InboundThankYou />} />
        
        <Route path='/confirmation/:slug' element={<ConfirmationForm />} />
        <Route path='/confirmation-summary/:slug' element={<ConfirmationSummary />} />
        
        {/* <Route path="*" element={<RequestQuote />} /> */}
      </Routes>
    </>
  );
}

export default App;
