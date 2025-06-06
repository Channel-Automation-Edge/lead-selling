// RehashOptions.tsx original
import { useAppContext } from '@/context/AppContext';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface RehashOptionsProps {
  quote: string;
}

const formatCurrency = (amount: string) => {
  const numericAmount = parseFloat(amount) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

export const RehashOptions = ({ quote }: RehashOptionsProps) => {
  const [selectedOption, setSelectedOption] = useState<'original' | 'custom' | 'installment'>('custom');
  const numericQuote = parseFloat(quote) || 0;
  const [selectedInstallment, setSelectedInstallment] = useState<'12' | '24' | '36'>('12');
  const { contractor } = useAppContext();
  const [slug, setSlug] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [customOffer, setCustomOffer] = useState('');
  
  // Calculate monthly payments
  const monthlyPayments = {
    twelve: numericQuote / 12,
    twentyFour: numericQuote / 24,
    thirtySix: numericQuote / 36,
  };

   // Function to append current URL parameters
  const navigateWithParams = (path: string) => {
    const currentParams = new URLSearchParams(location.search);
    navigate(`${path}?${currentParams.toString()}`);
  };

  useEffect(() => {
    if (contractor) {
      setSlug(contractor.slug);
    }
  }, [contractor]);

  const handleOriginalQuoteClick = () => {
    localStorage.setItem('payment_option', `Locking in your ${formatCurrency(quote)} quote`);
    localStorage.setItem('payment_option_raw', `Locking in ${formatCurrency(quote)} quote`);
    navigateWithParams(`/rehash-form/${slug}`);
  };

  const handleCustomOfferClick = () => {
    localStorage.setItem('payment_option', `Your ${formatCurrency(customOffer)} proposal`);
    localStorage.setItem('payment_option_raw', `Price proposal: ${formatCurrency(customOffer)}`);
    navigateWithParams(`/rehash-form/${slug}`);
  };

  const handleInstallmentClick = () => {
    localStorage.setItem('payment_option', `Your ${selectedInstallment}-Month Plan`);
    localStorage.setItem('payment_option_raw', `${selectedInstallment}-Month Plan`);
    navigateWithParams(`/rehash-form/${slug}`);
  }

  const handleCustomOfferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomOffer(value);
  };

  const accentShadow = contractor?.colors?.accent_rgba || 'rgba(250, 81, 0, 1)';

  // Reusable card classes
  const baseCardClasses = `flex flex-col border-2 rounded-xl p-8 transition-all duration-300 h-full bg-white transform origin-center`;
  const unselectedCardClasses = `${baseCardClasses} border-gray-200 dark:border-neutral-800 scale-100`;
  const selectedCardClasses = `${baseCardClasses} border-accentColor shadow-xl dark:border-accentColor scale-105 z-10`;

  const cardButton = 'py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border mt-auto transition-colors duration-300';

  return (
    <div className="max-w-[85rem] px-4 sm:px-6 mx-auto">


      {/* Options Grid */}
      <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {/* Original Quote Card */}
        <div 
          className={selectedOption === 'original' ? selectedCardClasses : unselectedCardClasses}
          onMouseEnter={() => setSelectedOption('original')}
          onTouchStart={() => setSelectedOption('original')}
          style={{
            boxShadow: selectedOption === 'original' 
              ? `${accentShadow} 0px 8px 18px -6px` 
              : 'none',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="flex-1 mb-5">
            <h4 className="font-medium text-lg text-gray-800 dark:text-neutral-200">
              Your Original Quote
            </h4>
            {quote ? (
              <span className="mt-5 font-bold text-3xl text-gray-800 dark:text-neutral-200">
                {formatCurrency(quote)}
              </span>
            ) : null}
            <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">
              {quote 
                ? "Act now to lock in this rate—let's discuss your project!"
                : "Act now to lock in your offered rate—let's discuss your project!"
              }
            </p>

            <ul className="mt-7 space-y-2.5 text-sm">
              <li className="flex gap-x-2">
                <svg
                  className="shrink-0 mt-0.5 size-4 text-accentColor dark:text-accentColor"
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
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-gray-800 dark:text-neutral-400">
                  Guaranteed options
                </span>
              </li>
              <li className="flex gap-x-2">
                <svg
                  className="shrink-0 mt-0.5 size-4 text-accentColor dark:text-accentColor"
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
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-gray-800 dark:text-neutral-400">
                  Original selections
                </span>
              </li>
              <li className="flex gap-x-2">
                <svg
                  className="shrink-0 mt-0.5 size-4 text-accentColor dark:text-accentColor"
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
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-gray-800 dark:text-neutral-400">
                  Priority scheduling
                </span>
              </li>
              {/* ... rest of list items ... */}
            </ul>
          </div>

          <a href="#form" className={`${cardButton} ${
              selectedOption === 'original'
                ? 'border-transparent bg-accentColor text-white'
                : 'border-gray-200 bg-white text-gray-800'
            }`} 
            onClick={handleOriginalQuoteClick}>
            {quote ? 'Lock In This Price →' : 'Secure This Rate →'}
          </a>
        </div>

        {/* Custom Offer Card (Pre-selected) */}
        <div 
          className={selectedOption === 'custom' ? selectedCardClasses : unselectedCardClasses}
          onMouseEnter={() => setSelectedOption('custom')}
          onTouchStart={() => setSelectedOption('custom')}
          style={{
            boxShadow: selectedOption === 'custom' 
              ? `${accentShadow} 0px 8px 18px -6px` 
              : 'none',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="flex-1 mb-5">
            <h4 className="font-medium text-lg text-gray-800 dark:text-neutral-200">
              Custom Offer
            </h4>
            <p className="mt-2">
              <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs uppercase font-semibold bg-accentLight text-accentColor">
                Most Flexible
              </span>
            </p>
            <p className="mt-5 text-sm text-gray-500 dark:text-neutral-500">
              Discuss budget-friendly options with our team—no pressure.
            </p>


            <div className="mt-6 space-y-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  id="custom-offer"
                  value={customOffer}
                  onChange={handleCustomOfferChange}
                  placeholder='Your Proposed Amount'
                  className="pl-7 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-accentColor focus:border-accentColor transition-all"
                  min={numericQuote * 0.5}
                  max={numericQuote * 1.5}
                  step="100"
                />
              </div>
            </div>

          </div>


          <a href="#form" className={`${cardButton} ${
              selectedOption === 'custom'
                ? 'border-transparent bg-accentColor text-white'
                : 'border-gray-200 bg-white text-gray-800'
            }`} onClick={handleCustomOfferClick}>
            Make an Offer →
          </a>
        </div>

        {/* Installment Plan Card */}
        <div 
          className={`${selectedOption === 'installment' ? selectedCardClasses : unselectedCardClasses} flex flex-col`}
          onMouseEnter={() => setSelectedOption('installment')}
          onTouchStart={() => setSelectedOption('installment')}
          style={{
            boxShadow: selectedOption === 'installment' 
              ? `${accentShadow} 0px 8px 18px -6px` 
              : 'none',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="flex-1 mb-5">
            <h4 className="font-medium text-lg text-gray-800 dark:text-neutral-200">
              Installment Plans
            </h4>
            <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">
              0% APR financing available
            </p>

            <div className="mt-5 grid gap-2">
              {(['12', '24', '36'] as const).map((months) => (
                <div
                  key={months}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedInstallment(months);
                  }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedInstallment === months
                      ? 'border-accentColor shadow-md bg-accentLight'
                      : 'border-gray-200 hover:border-accentColor dark:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {/* Radio Indicator */}
                    <div
                      className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${
                        selectedInstallment === months
                          ? 'border-accentColor bg-accentLight'
                          : 'border-gray-300 dark:border-neutral-600'
                      }`}
                    >
                      {selectedInstallment === months && (
                        <div className="w-2 h-2 rounded-full bg-accentColor" />
                      )}
                    </div>
                    {/* Payment Info */}
                    <div className="flex justify-between items-center w-full text-sm ">
                      
                        {quote ? (
                          <>
                          <div className="flex items-baseline gap-1">
                            <span className={`font-medium ${
                              selectedInstallment === months
                                ? 'text-accentColor'
                                : 'text-gray-500'
                            }`}>
                              {formatCurrency(monthlyPayments[months === '12' ? 'twelve' : months === '24' ? 'twentyFour' : 'thirtySix'].toString())}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-neutral-400">
                              / month
                            </span>
                          </div>
                          </>
                        ) : null}
                      
                      <span className="text-sm text-gray-500 dark:text-neutral-400">
                        {months} months
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Anchored CTA Button */}
          <a 
            href="#form" 
            className={`${cardButton} ${
              selectedOption === 'installment'
                ? 'border-transparent bg-accentColor text-white'
                : 'border-gray-200 bg-white text-gray-800'
            }`} onClick={handleInstallmentClick}
          >
            Choose Plan →
          </a>
        </div>
      </div>
    </div>
  );
};