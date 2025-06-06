import { useAppContext } from '@/context/AppContext';
import BlurFade from './ui/blur-fade';
import { ComparisonSlider } from './ComparisonSlider';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SliderSection: React.FC = () => {
  const { contractor, selectedService } = useAppContext();
  const [slug, setSlug] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const defaultHeader = (
    <>
      See What’s Possible for  <span className="text-accentColor">Your Home</span> 
    </>
  );
  const featureHeader = defaultHeader;
  const socialProof: string[] = contractor.social_proof;

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
    navigateWithParams(`/rehash-hp/${slug}`);
  };


  return (
    <div className="">
      {/* Grid */}
      <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32 ">
        <BlurFade delay={1 * 0.15} inView yOffset={0} className="mb-5 sm:mb-10 lg:mb-0">
          <ComparisonSlider
            beforeImage={selectedService?.content?.before || 'https://project-starfish.s3.us-east-005.backblazeb2.com/feature/before-bath3.png'}
            afterImage={selectedService?.content?.after || 'https://project-starfish.s3.us-east-005.backblazeb2.com/feature/after-bath3.png'}
            containerWidth="w-auto"
          />
        </BlurFade>
        {/* End Col */}

        <BlurFade delay={3 * 0.15} inView yOffset={0} className="">
          <div className="space-y-6 sm:space-y-8">
            {/* Title */}
            <div className="space-y-2 md:space-y-4 cursor-default">
              <h2 className="section_header ">
                {featureHeader}
              </h2>
              <p className="section_description">
                Our {selectedService?.services?.name} transformations speak for themselves. Not quite ready? Let's discuss options—no pressure, just answers.
              </p>
            </div>
            {/* End Title */}
            <button className='rounded-lg bg-accentColor px-4 py-3 text-base font-medium text-white hover:bg-accentDark inline-flex items-center' onClick={handleButtonClick} >Start My Transformation</button>

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
        </BlurFade>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
  );
};

export default SliderSection;
