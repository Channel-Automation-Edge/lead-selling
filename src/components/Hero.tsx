"use client";
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import useClearFormState from '@/hooks/useClearFormState.tsx';
import { InteractiveHoverButton } from './ui/interactive-hover-button';
import {PromoModal, DialogTitle, Dialog} from '@/components/PromoModal';
import useFormPersistence from '@/hooks/useFormPersistence';
import BlurFade from './ui/blur-fade';

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const clearFormState = useClearFormState();

  const capitalizeWords = (str: string | null) => {
    if (!str) return '';
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  const { contractor, setForm, form, services } = useAppContext();
  const urlParams = new URLSearchParams(location.search);
  const firstnameParam = capitalizeWords(urlParams.get('firstname')) || '';
  const conceptParam = urlParams.get('concept_id') || '';
  const [slug, setSlug] = useState('');
  const initialStep = services.length > 1 ? 1 : 2;
  const [, , resetCurrentStep] = useFormPersistence('formStep', initialStep);
  const [heroMedia, setHeroMedia] = useState('');

  // Default content
  const defaultLede = firstnameParam
    ? `Receive a customized assessment of your home’s specific needs and expert recommendations tailored just for you by our experienced team`
      : "Hi there, receive a customized assessment of your home’s specific needs and expert recommendations tailored just for you by our experienced team";

  const heroH1 = contractor.content.hero_h1 || "Building Better Spaces for Better Living";
  const heroLede = contractor.content.hero_lede || defaultLede;
  const heroCtaLabel = contractor.content.hero_cta || "Get Free Assessment";

  const [buttonText, setButtonText] = useState(heroCtaLabel);
  const [, setSubheadingText] = useState("Or select a service to get started");
  const [subheadingText1, setSubheadingText1] = useState(heroLede);

  useEffect(() => {
    if (contractor) {
      setSlug(contractor.slug);
    }
  }, [contractor]);

  // Determine the hero media
  useEffect(() => {
    if (contractor.content.b_roll) {
      setHeroMedia(contractor.content.b_roll);
    } else if (contractor.content.bg_photo) {
      setHeroMedia(contractor.content.bg_photo);
    } else {
      setHeroMedia('/images/feature.jpg');
    }
  }, [contractor.content.b_roll, contractor.content.bg_photo]);
  
  
  // Update button text based on form progress
  useEffect(() => {
    const step = localStorage.getItem('formStep');
    const targetStep = services.length === 1 ? "2" : "1";

    if (step !== null && step !== targetStep) {
      setButtonText("Finish your Previous Quote");
      setSubheadingText("Or reset your progress and select another service");
    } else {
      setButtonText(heroCtaLabel);
    }

    setSubheadingText1(heroLede);
  }, [services.length, heroLede, heroCtaLabel]);

  // Function to append current URL parameters
  const navigateWithParams = (path: string) => {
    const currentParams = new URLSearchParams(location.search);
    navigate(`${path}?${currentParams.toString()}`);
  };

  // Function to generate a random string
  const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleButtonClick = () => {
    let formId = form.formId;

    // If formId is not set, create a new formId
    if (!formId) {
      resetCurrentStep();
      clearFormState();

      const dateTime = new Date().toISOString().replace(/[-:.T]/g, '').slice(0, 14); // YYYYMMDDHHMMSS format
      const randomString = generateRandomString(6);

      formId = `${contractor.id}-${dateTime}-${randomString}`;
      console.log('Generated formId:', formId);
    } else {
      console.log('Using existing form ID:', formId);
    }

    // Update the form and user object in context
    setForm((prevForm) => ({
      ...prevForm,
      formId: formId,
    }));
    navigateWithParams(`/request-quotes/${slug}`);
  };

  // const bRoll = contractor.content.b_roll || 'https://storage.googleapis.com/channel_automation/Webassets/video/homeprojectparterns-hero_9.0.10.webm'; // Get hero video from contractor content

  return (
    <div>
      {/* <NavBar2 /> */}
      <div className="relative flex items-center" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="absolute inset-0">
          {heroMedia.endsWith('.webm') || heroMedia.endsWith('.mp4') ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src={heroMedia}
            ></video>
          ) : (
            <div
              className="w-full h-full bg-cover bg-top"
              style={{ backgroundImage: `url(${heroMedia})` }}
            ></div>
          )}
        </div>
        <div className="absolute inset-0 bg-[#12121d99] opacity-100 z-[1]"></div> {/* Moved overlay after video and added z-index */}

        <div  className="relative z-[2] w-full overflow-hidden"> {/* Added z-index to content container */}
          
          <div className="z-10 lg:w-8/12 flex items-left justify-left flex-col px-4 sm:pl-16 mt-0 space-y-6 md:space-y-8 pb-4">
            <BlurFade delay={2 * 0.25} yOffset={0}
              className="block font-display text-left text-4xl md:text-5xl lg:text-6xl font-semibold text-white pointer-events-none">
              {heroH1}
            </BlurFade>

            <BlurFade delay={4 * 0.25} yOffset={0}
              className="text-sm md:text-base lg:text-lg text-white/80 text-left pointer-events-none"
            >
              {firstnameParam ? `Hi ${firstnameParam}! ` : ''}{subheadingText1}
            </BlurFade>

            <BlurFade delay={6 * 0.25} yOffset={0} className="mt-5 lg:mt-8 flex flex-col items-start gap-2 sm:flex-row sm:gap-3">
              
              <InteractiveHoverButton className='bg-accentColor text-white border-transparent text-sm rounded-lg py-3 plausible-event-name=CTA_click plausible-event-position=hero' onClick={handleButtonClick} >{buttonText}</InteractiveHoverButton>
            </BlurFade>

          </div>
        </div>
      </div>
      {/* render promomodal if concept param exists and is not empty */}
      { conceptParam && conceptParam !== '' && (
        <Dialog open={true}>
          <DialogTitle></DialogTitle>
          <PromoModal onButtonClick={handleButtonClick} />
        </Dialog>
      )
      }

    </div>
  );
};

export default Hero;
