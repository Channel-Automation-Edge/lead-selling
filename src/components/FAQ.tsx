import React, { useState } from 'react';
import BlurFade from './ui/blur-fade';
import { useAppContext } from '@/context/AppContext';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { contractor } = useAppContext();

  if (!contractor.faqs || contractor.faqs.length === 0) {
    return null;
  }

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className=''>
      <div className="">
      {/* Grid */}
      <div className="grid md:grid-cols-5 gap-5">
        <BlurFade delay={1 * 0.15} inView yOffset={0} className="md:col-span-2 pointer-events-none">
          <div className="space-y-2 md:space-y-4 max-w-xs">
            <h2 className="section_header">
              Frequently Asked Questions
            </h2>
            <p className="section_description">
              Here are some of the most common questions we receive.
            </p>
          </div>
        </BlurFade>
        {/* End Col */}

        <BlurFade delay={3 * 0.15} inView yOffset={0} className="md:col-span-3">
          {/* Accordion */}
          <div className="hs-accordion-group divide-y divide-gray-200 dark:divide-neutral-700">
            {contractor.faqs.map((item: FAQItem, index: number) => (
              <div className="hs-accordion pt-6 pb-3" key={item.id}>
                <button
                  className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-accentColor focus:outline-none focus:text-accentColor dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                  aria-expanded={activeIndex === index}
                  aria-controls={`hs-basic-with-title-and-arrow-stretched-collapse-${item.id}`}
                  onClick={() => toggleAccordion(index)}
                >
                  {item.question}
                  <svg
                    className={`hs-accordion-active:${activeIndex === index ? 'block' : 'hidden'} shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={`m${activeIndex === index ? '18 15-6-6-6 6' : '6 9 6 6 6-6'}`} />
                  </svg>
                </button>
                <div
                  id={`hs-basic-with-title-and-arrow-stretched-collapse-${item.id}`}
                  className={`hs-accordion-content ${activeIndex === index ? 'block' : 'hidden'} w-full overflow-hidden transition-[height] duration-300`}
                  role="region"
                  aria-labelledby={`hs-basic-with-title-and-arrow-stretched-heading-${item.id}`}
                >
                  <p className="text-gray-600 dark:text-neutral-400">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* End Accordion */}
        </BlurFade>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
    </div>
  );
};

export default FAQ;
