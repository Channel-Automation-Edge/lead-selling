import React from 'react';

interface StepperProps {
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const steps = [
    { title: 'Project', description: 'Tell us what you need' },
    { title: 'Details', description: 'Confirm your details' },
    { title: 'Free Consultation', description: 'Schedule your free consultation.' },
  ];

  // Map currentStep to the correct step index in the steps array
  const stepIndex = 
    (currentStep === 1) ? 0 :
    (currentStep === 2) ? 1 :
    (currentStep === 3 || currentStep === 4) ? 2 : -1;

  return (
    <div>
      <h2 className="sr-only">Steps</h2>
      <div>
        <ol className="flex flex-nowrap divide-x divide-gray-200 overflow-hidden rounded-lg border border-gray-200 text-sm text-gray-500">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`flex items-center justify-center gap-2 p-2 small-stepper:p-3 md:p-4 ${
                stepIndex === index ? 'bg-accentLight' : ''
              }`}
            >
              <img
                className="hidden custom-smallest:inline-block w-5 h-5 small-stepper:w-6 small-stepper:h-6 md:size-7 shrink-0"
                src={
                  index === 0
                    ? '/images/project.svg'
                    : index === 1
                    ? '/images/details.svg'
                    : '/images/appointment.svg'
                }
                alt={step.title} // Provide an alt attribute for accessibility
              />
              <p className="leading-none text-xs small-stepper:text-[14px]">
                <strong className="block font-medium">{step.title}</strong>
                <small className="mt-1 hidden sm:block">{step.description}</small>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Stepper;
