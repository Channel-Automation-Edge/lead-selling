"use client";
import React from 'react';
import BlurFade from './ui/blur-fade';

const HowItWorks: React.FC = () => {
  return (
    <div className='bg-white'>
      <div className="space-y-6 sm:space-y-8 pointer-events-none">
        <BlurFade inView delay={1 * 0.15}  yOffset={0} className="space-y-2 md:space-y-4 text-center">
            <h2 className="section_header">
            Here's What to <span className="text-accentColor">Expect</span>
            </h2>
            <p className="section_description">

            </p>
        </BlurFade>
        <BlurFade inView delay={2 * 0.15}  yOffset={0} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 sm:px-6 lg:px-8 mx-auto">

        <BlurFade inView delay={3 * 0.15}  yOffset={0} className="relative flex sm:pe-6">
          <img src="/images/step3.svg" alt="Step 1" className="shrink-0 size-10 mt-1" />
          <div className="ms-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">1: Appointment Confirmation</h3>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Your appointment is scheduled! We'll send you a reminder before the date to make sure you're all set.
            </p>
          </div>
        </BlurFade>

        <BlurFade inView delay={4 * 0.15}  yOffset={0} className="relative flex sm:pe-6">
          <img src="/images/step1.svg" alt="Step 2" className="shrink-0 size-10 mt-1" />
          <div className="ms-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">2: In-Home Assessment</h3>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Our specialist will arrive at the scheduled time to assess your project, take measurements, and offer expert recommendations.
            </p>
          </div>
        </BlurFade>



        <BlurFade inView delay={5 * 0.15}  yOffset={0} className="relative flex sm:pe-6">
          <img src="/images/step2.svg" alt="Step 3" className="shrink-0 size-10 mt-1" />
          <div className="ms-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">3: Personalized Quote</h3>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Receive a personalized quote with options that suit your home and budget. We'll walk you through everything to get your project started smoothly.
            </p>
          </div>
        </BlurFade>


        </BlurFade>
      </div>
      
    </div>
    
  );
};

export default HowItWorks;
