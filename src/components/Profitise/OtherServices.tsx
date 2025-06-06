import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import Services from '@/components/Services';

// Define props interface
interface OtherServicesProps {
  onNext: (nextStep: number) => void; 
}

const OtherServices: React.FC<OtherServicesProps> = ({ onNext }) => {
  const { services, setSelectedService } = useAppContext(); 
  const [loading, setLoading] = useState<boolean>(false); // State to control spinner
  const params = new URLSearchParams(window.location.search);
  const initial = params.get('firstname');
  const test = params.get('test');

  // Utility function to capitalize the first letter
  const capitalizeFirstLetter = (string: string | null) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const firstname = capitalizeFirstLetter(initial) || 'there'; ;

  const handleServiceSelect = async (service: any) => {
    setLoading(true); // Show spinner
    setSelectedService(service); // Save the entire service item
    setLoading(false); // Hide spinner
    if (service.service_id === 17) {
      onNext(3); // Pass step 3 to parent
    } else {
      onNext(4); // Pass step 2 to parent
    }
  };

  return (
    <div className="container-form">
      <div className="space-y-8">
        <div className='flex justify-center text-center mb-8'>
          <div className="max-w-[40rem] text-center">
            <h1 className="heading-form">
              {test !== 'B' && test !== 'b' ? `Hi ${firstname}! ` : ''}
               Let's bring your{' '} <span className="text-accentColor">future project</span> to life—choose what fits your vision below
            </h1>
          </div>
        </div>

        <Services services={services} handleServiceSelect={handleServiceSelect} />

        {loading && (
          <div className="flex justify-center pt-20">
            <div className="animate-spin h-6 w-6 border-2 border-accentColor border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherServices;
