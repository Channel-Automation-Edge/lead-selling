import { useAppContext } from "@/context/AppContext";

const InterestFeature = () => {
  const { setSelectedService, services } = useAppContext();
  const handleClaimQuote = () => {
    console.log('Claim quote clicked');
    
    // go throught services array and find the object where service_id === 1, and save that whole object to selectedService
    const service = services.find((service: any) => service.service_id === 1);
    setSelectedService(service);

    //redirect with params
    
    
  }
  return (
    <div className="w-full">
        {/* card */}
        <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg relative">
          <img 
            src="/images/bath-interest.png" 
            alt="Interest feature"
            className="w-full h-auto object-cover"  
          />
          <div className="absolute bottom-0 w-full p-4 sm:pb-8 md:pb-12 lg:pb-14 flex justify-left">
            <button 
              className="bg-accentColor text-white border-transparent font-medium text-sm sm:text-base lg:text-xl rounded-lg py-2 sm:py-3 px-6 sm:px-8 lg:px-12 shadow-md transition-colors duration-300 hover:bg-opacity-90"
              onClick={handleClaimQuote}
            >
              Claim Free Quote
            </button>
          </div>
        </div>
    </div>
  )
}

export default InterestFeature
