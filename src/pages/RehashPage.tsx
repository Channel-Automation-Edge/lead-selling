import { useAppContext } from '@/context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ComparisonSlider } from '@/components/ComparisonSlider';
import NavBar2 from '@/components/NavBar2';
import Feature from '@/components/Feature';
import TestimonialsGray from '@/components/TestimonialsGray';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import SocialProof from '@/components/SocialProof';
import { RehashOptions } from '@/components/RehashOptions';
import PriceChartSection from '@/components/PriceChartSection';

const RehashPage = () => {
  const { contractor, services, setSelectedService, selectedService } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [slug, setSlug] = useState('');
  const params = new URLSearchParams(location.search);
  const serviceId = params.get('service');
  const socialProof: string[] = contractor.social_proof;
  const yourQuote = params.get('quote');
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

  useEffect(() => {
    if (contractor) {
      setSlug(contractor.slug);
    }
  }, [contractor]);

  // Function to append current URL parameters
  const navigateWithParams = (path: string) => {
    const currentParams = new URLSearchParams(location.search);
    navigate(`${path}?${currentParams.toString()}`);
  };

  const handleButtonClick = () => {
    navigateWithParams(`/rehash-form/${slug}`);
  };

  if (!contractor || !services || !selectedService) {
    return null; // or a loading spinner
  }
  return (
    <div className='min-h-screen bg-gray-50'>
      <NavBar2 />
      <div className='container-main'>

        {/* section 1 */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
          {/* First column/row item */}
          <div className=' p-4 rounded-lg space-y-6 sm:space-y-8 mt-4 justify-center flex flex-col '>
        
            <div className='space-y-4 sm:space-y-6'>
              <p className='font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-800'>Hi {firstname}, Your <span className='text-accentColor'>{selectedService?.services?.name} Remodel</span> Quote is Still Waiting!</p>
              <p className='text-base sm:text-lg text-gray-800'>Not quite ready? Let's discuss options—no pressure, just answers.</p>
            </div>
            
            <button className='bg-accentColor text-white font-semibold hover:bg-accentDark text-lg border-transparent rounded-lg py-4 px-6 w-60' onClick={handleButtonClick} >Request Callback</button>

            <div className="hidden sm:flex flex-wrap justify-left gap-2 sm:gap-4 md:gap-6">
              {socialProof.map((proof: string, index: number) => (
                <div 
                  key={index}
                  className={`w-[calc(35%-1rem)] ${
                    socialProof.length <= 3 
                      ? 'sm:w-[calc(25%-1rem)]' 
                      : 'sm:w-[calc(20%-1rem)]'
                  } aspect-square p-2`}
                >
                  <img
                    src={proof}
                    alt={`Social proof ${index + 1}`}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              ))}
            </div>
            
          </div>
          
          {/* Second column/row item */}
          <div className=' p-4 rounded-lg justify-center flex flex-col'>
            {/* <GalleryMarquee /> */}
            <div >
              <ComparisonSlider
                beforeImage={selectedService?.content?.before || 'https://project-starfish.s3.us-east-005.backblazeb2.com/feature/before-bath3.png'}
                afterImage={selectedService?.content?.after || 'https://project-starfish.s3.us-east-005.backblazeb2.com/feature/after-bath3.png'}
                containerWidth="w-auto"
              />
            </div>


          </div>
        </div>

        {/* section 2 */}
        <div>
          <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Flexible Payment Options
            </h2>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Choose the option that works best for your budget and needs.
            </p>
          </div>
          <RehashOptions quote={yourQuote || ''} />
        </div>

      </div>

      <TestimonialsGray />

      <div className='container-main'>
        <PriceChartSection />
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

export default RehashPage