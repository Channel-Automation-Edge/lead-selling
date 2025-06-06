import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import Nav from "@/components/Nav";
import Header from "@/components/Header";
import InterestFeature from "@/components/InterestFeature";
import BlurFade from "@/components/ui/blur-fade";
import ServiceIconSelect from "@/components/ServiceIconSelect";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const Home = () => {
  const { services, user, setSelectedService, contractor } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [slug, setSlug] = useState('');

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


  const handleServiceSelect = (service: any) => {
    console.log('Selected service:', service);
    // Save the selected service to the AppContext
    setSelectedService(service);
    // navigate with paramsslug
    navigateWithParams(`/request-quotes/${slug}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <Nav />
      {/* <Hero/> */}

      {/* <Testimonials /> */}

      <div className="container-main">
        <div className="space-y-4 md:space-y-2">
          <div className="pt-4 space-y-1 md:space-y-2">
          <h2 className="section_header">Good day, {user?.firstname}! 👋</h2>
          <p className="text-sm w-3/4 text-gray-700">
            We're here to help you with your home improvement needs.
          </p>

          </div>

          <InterestFeature />
        </div>

        {/* Services */}
        <div className="space-y-2">
          {/* title */}
          <BlurFade
            delay={2 * 0.15}
            inView
            yOffset={0}
            className="text-left space-y-2 md:space-y-4"
          >
            <div className="section_sub_header">
              Check out our other services
            </div>
          </BlurFade>

          <BlurFade delay={3 * 0.15} inView yOffset={0}>
            <ServiceIconSelect 
              services={services || []}
              handleServiceSelect={handleServiceSelect}
            />
          </BlurFade>
        </div>

        {/* Testimonials */}
        <div className="space-y-0">
          {/* title */}
          <BlurFade
            delay={2 * 0.15}
            inView
            yOffset={0}
            className="text-left space-y-2 md:space-y-4"
          >
            <div className="section_sub_header">
              What our customers say
            </div>
          </BlurFade>

          <BlurFade delay={3 * 0.15} inView yOffset={0}>
            <Testimonials />
          </BlurFade>
        </div>
        
        
        {/* {services && services.length > 1 && <ServiceCards />}
        <Feature /> */}
      </div>


      {/* <SocialProof />
      <div className="container-main">
        <Benefits />
        <FAQ />
      </div> */}

      <Footer />
    </div>
  );
};

export default Home;
