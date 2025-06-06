import { useAppContext } from '@/context/AppContext';
import {  useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar2 from '@/components/NavBar2';
import Feature from '@/components/Feature';
import TestimonialsGray from '@/components/TestimonialsGray';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import SocialProof from '@/components/SocialProof';
import { RehashOptions } from '@/components/RehashOptions';
import PriceChartSection from '@/components/PriceChartSection';
import SliderSection from '@/components/SliderSection';

const RehashPage2 = () => {
  const { contractor, services, setSelectedService, selectedService } = useAppContext();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const serviceId = params.get('service');
  const yourQuote = params.get('quote') ;
  const homeValue = Number(params.get('home_value')) || 0;


  const capitalizeWords = (str: string | null) => {
    if (!str) return '';
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };
  const firstname = capitalizeWords(params.get('firstname')) || '';

  const useInitialWebhook = () => {
    const location = useLocation();
  
    useEffect(() => {
      const userNs = params.get('user_ns');
  
      // Check if webhook has already been sent (using localStorage)
      if (userNs && !localStorage.getItem('rehashWebhookSent')) {
        const payload = {
          workspace_id: params.get('company_id'),
          user_ns: userNs,
          market: params.get('market'),
          event: "rehash_link_clicked",
          timestamp: new Date().toISOString(),
        };
  
        // Send to webhook
        fetch('https://hkdk.events/dd4ps4ew70am0n', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        .then(() => {
          // Mark as sent in localStorage
          localStorage.setItem('rehashWebhookSent', 'true');
        })
        .catch((error) => console.error('Webhook error:', error));
      }
    }, [location.search]);
    
  };
  useInitialWebhook();

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
        selectedService = services.find((service: any) => 
          service.service_id === numericServiceId
        ) || services[0]; // Fallback to first service if not found
      }

      if (selectedService) {
        console.log('Setting service:', selectedService);
        setSelectedService(selectedService);
      } else {
        console.error(`Service with ID ${numericServiceId} not found. Available services:`, services);
      }
    }
  }, [serviceId, services, setSelectedService]);

  const projectCost = Number(yourQuote) || 0;
  const roiPercentage = selectedService?.services?.roi || 0;
  const valueIncrease = projectCost * (roiPercentage / 100);
  const newHomeValue = homeValue + valueIncrease;

  useEffect(() => {
    console.log('homeValue:', homeValue);
    console.log('projectCost:', projectCost);
    console.log('roiPercentage:', roiPercentage);
    console.log('valueIncrease:', valueIncrease);
    console.log('newHomeValue:', newHomeValue);
  }
  , [homeValue, projectCost, roiPercentage, valueIncrease]);

  // Create currency formatter
  const formatCurrency = (value: number) => 
  new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    maximumFractionDigits: 0 
  }).format(value);  




  if (!contractor || !services || !selectedService) {
    return null; // or a loading spinner
  }
  return (
    <div className='min-h-screen bg-gray-50'>
      <NavBar2 />
      <div className='container-main'>
        <div>
          <div className="max-w-4xl mx-auto text-center mb-10 lg:mb-14 space-y-2 md:space-y-4">
            {/* Case 1: All data available (home value, quote, and roi) */}
            {homeValue > 0 && projectCost > 0 && roiPercentage > 0 ? (
              <>
                <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-800">
                  Hi {firstname}, your <span className='text-accentColor'>{selectedService?.services?.name} Remodel</span> could add <span className='text-accentColor'>{formatCurrency(valueIncrease)}</span> to your home's value
                </h2>
                <p className="mt-1 section_description">
                  A typical {selectedService?.services?.name} remodel can increase your home's value by as much as {roiPercentage}% of your quote - meaning your {formatCurrency(homeValue)} home could become {formatCurrency(newHomeValue)}. Let's chat about making that vision work for your budget
                </p>
              </>
            ) : projectCost <= 0 ? (
              /* Case 2: No quote or empty quote */
              <>
                <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-800">
                  Hi {firstname}, your <span className='text-accentColor'>{selectedService?.services?.name} Remodel</span> could boost your home's value significantly
                </h2>
                <p className="mt-1 section_description">
                  A typical {selectedService?.services?.name} remodel recoups up to {roiPercentage}% of project costs in added home value. For your {formatCurrency(homeValue)} home, strategic updates could unlock meaningful equity. Let's explore options tailored to your budget and goals.
                </p>
              </>
            ) : (
              /* Case 3: No ROI or empty ROI */
              <>
                <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-800">
                  Hi {firstname}, your <span className='text-accentColor'>{selectedService?.services?.name} Remodel</span> could boost your home's value significantly
                </h2>
                <p className="mt-1 section_description">
                  A typical home remodel recoups up to 69.9% of project costs in added home value. For your {formatCurrency(homeValue)} home, strategic updates could unlock meaningful equity. Let's explore options tailored to your budget and goals.
                </p>
              </>
            )}
          </div>
          <RehashOptions quote={yourQuote || ''} />
        </div>
      </div>

      <TestimonialsGray />

      <div className='container-main'>
        <SliderSection />
        {yourQuote && <PriceChartSection />}
        <Feature />

        <div className='flex sm:hidden'>
          <SocialProof />
        </div>

        <FAQ  />
      </div>
      <Footer />
    </div>
  )
}

export default RehashPage2