import { useAppContext } from '@/context/AppContext';

const ConfirmCTA = () => {
  const { contractor } = useAppContext();

  const handleRedirect = () => {
    // Get existing URL parameters
    const currentParams = new URLSearchParams(window.location.search);
    
    // Get form ID from localStorage
    const formID = localStorage.getItem('tempFormID');
    
    // Create new URL parameters
    const newParams = new URLSearchParams({
      ...Object.fromEntries(currentParams),
      form_id: formID || '' // Fallback to empty string if null
    });

    // Build new URL
    const newUrl = `/confirmation/${contractor?.slug}?${newParams.toString()}`;
    
    // Perform redirect
    window.location.href = newUrl;
  };


  if (!contractor || contractor.online_confirmation !== true) {
    return null;
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='bg-accentColor p-8 md:py-10 md:px-14 rounded-lg shadow-lg sm:flex w-full max-w-[962px] sm:justify-between space-y-4'>
        <div className='space-y-2'>
          <h2 className='font-medium text-xl sm:text-2xl lg:text-3xl text-white'>Confirm Your Appointment Online</h2>
          <p className='text-sm text-white'>Skip the wait and secure your appointment online</p>
        </div>
        <div className='flex items-center'>
          <button className='bg-white text-accentColor text-sm font-medium w-auto px-5 py-4 sm:px-5 md:px-8 rounded-full hover:scale-110 transform transition-transform' onClick={handleRedirect}
          >Confirm Appointment</button>
        </div>
      </div>
      
    </div>
  )
}

export default ConfirmCTA
