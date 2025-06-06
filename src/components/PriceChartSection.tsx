import BlurFade from './ui/blur-fade'
import { useAppContext } from '@/context/AppContext';
import PriceComparisonChart from './PriceComparisonChart';


const PriceChartSection = () => {
  const { selectedService } = useAppContext();
  
  // Format national average as currency
  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value || 0);
  };
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-0 '>
      {/* First column/row item */}
      <div className=' p-4 rounded-lg space-y-6 sm:space-y-8 mt-4 justify-center flex flex-col '>
        <div className='space-y-6 sm:space-y-8'>
          <BlurFade delay={3 * 0.15} inView yOffset={0}>
            <div className="space-y-6 sm:space-y-8 cursor-default">
              {/* col 1 */}
              <div className="space-y-2 md:space-y-4 ">
                <h2 className="section_header">
                  How Your Quote Stacks Up
                </h2>
                <p className="section_description">
                  See how your price compares to the local average—and why we're the best value.
                </p>
              </div>
              <ul className="marker:text-accentColor list-disc ps-5 space-y-2 sm:space-y-4 text-sm sm:text-base text-gray-500">
                <li>
                  Most homeowners spend around <span className='font-bold text-accentColor'> {formatCurrency(selectedService?.services.national_avg)} </span> on a typical {selectedService?.services?.name} Remodel project.
                </li>
                <li>
                  Size, labor, and materials are the biggest cost factors.
                </li>
                <li>
                  Costs vary significantly based on materials
                </li>
              </ul>
              {/* End col 1 */}
            </div>
          </BlurFade>
        </div>
      </div>
      
      {/* Second column/row item */}
      <div className=' p-4 rounded-lg space-y-6 sm:space-y-8 mt-4 justify-center flex flex-col '>
        <BlurFade delay={1 * 0.15} inView yOffset={0}>
          <PriceComparisonChart />

        </BlurFade>
      </div>
    </div>
  )
}

export default PriceChartSection
