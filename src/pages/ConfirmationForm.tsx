import { useFormik } from 'formik';
import { useAppContext } from '@/context/AppContext';
import Navbar from '@/components/NavBar';
import { useEffect, useRef, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Dialog, DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogTitle
} from '@/components/ui/dialog2';
import { Button } from '@/components/ui/button';
import ConfirmCheck from '@/components/icons/ConfirmCheck';
import { central } from '@/lib/supabaseClient';


const ConfirmationForm = () => {
  const { contractor } = useAppContext();
  const [formData, setFormData] = useState<any>(null);
  const accent_rgba = contractor?.colors?.accent_rgba || '0 10px 25px -6px rgba(0, 0, 0, 0.1)';
  const animationRefs = useRef<{ [key: string]: any }>({});
  const params = new URLSearchParams(window.location.search);

  // Fetch booking data from Supabase
  useEffect(() => {
    const fetchBooking = async () => {
      
      const formId = params.get('form_id');
      
      if (!formId) return;
      
      const { data, error } = await central.from('bookings')
        .select('*')
        .eq('id', formId)
        .single();

      if (error || !data) return;
      setFormData(data);
      console.log('Booking data:', data);
    };

    fetchBooking();
  }, []);

  // Formik configuration
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      homeowner: null as boolean | null,
      HomeOwnersPresent: null as boolean | null,
      AddressVerified: null as boolean | null,
      address1: formData?.address1 || '',
      address2: formData?.address2 || '',
      city: formData?.city || '',
      state: formData?.state || '',
      zip: formData?.zip || ''
    },
    onSubmit: async (values) => {
      if (!formData) return;
      try {
        await fetch('https://hkdk.events/w8wqxy2op6oty4', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: "confirmation",
            homeowner: values.homeowner,
            HomeOwnersPresent: values.HomeOwnersPresent,
            AddressVerified: values.AddressVerified,
            user: {
              firstname: formData.firstname,
              lastname: formData.lastname,
              zip: values.zip,
              address1: values.address1,
              address2: values.address2,
              city: values.city,
              email: formData.email,
              phone: formData.phone,
              state: values.state,
              userNs: formData.userNs,
              market: formData.market,
            },
            form: {
              formId: formData.id,
              serviceSpecification: formData.service_specification,
              generalOptIn: formData.opt_in,
              date: formData.date,
              time: formData.time,
              timezone: formData.timezone,
              timezoneAbbr: formData.timezoneAbbr,
              promo: formData.promo,
            },
            selectedService: formData.selected_service,
            consent: {
              general: {
                description: `By checking the box above, I provide my ESIGN and express written consent for ${contractor?.name} and its authorized partners to contact me...`,
                value: true
              }
            },
            company_id: formData.contractor_id,
          })
        });
      } catch (error) {
        console.error('Webhook error:', error);
      }

      // update the database
      try {
        const { data, error } = await central
          .from('bookings')
          .update([
            {
              confirmed: true,
              homeowner: values.homeowner,
              home_owners_present: values.HomeOwnersPresent,
              address_verified: values.AddressVerified,
              address1: values.address1,
              address2: values.address2,
              city: values.city,
              state: values.state,
              zip: values.zip,
            },
          ])
          .eq('id', formData.id);
    
        if (error) {
          console.error('Error inserting data:', error);
        } else {
          console.log('Data inserted successfully:', data);
        }
        document.getElementById("dialog")?.click();
      } catch (err) {
        console.error('Unexpected error:', err);
      }	
    },

    
  });

  const capitalizeWords = (str: string | null) => {
    if (!str) return '';
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  const handleRedirect = () => {
    // Get current URL parameters
    const currentParams = new URLSearchParams(window.location.search);
    
    // Build new URL with existing parameters
    const newUrl = `/confirmation-summary/${contractor?.slug}?${currentParams.toString()}`;
    
    // Perform redirect
    window.location.href = newUrl;
  };

  const firstname = capitalizeWords(params.get('firstname') || '');

  const renderQuestion = (question: string, fieldName: string) => (
    <div className="mb-12">
      <h3 className="text-base sm:text-lg font-medium sm:font-semibold mb-4 text-center text-gray-800">{question}</h3>
      <div className="flex justify-center gap-4">
        {[true, false].map((option) => {
          const isSelected = formik.values[fieldName as keyof typeof formik.values] === option;
          const label = option ? 'Yes' : 'No';
          
          return (
            <button
              key={label}
              type="button"
              className={`cards-button-small relative ${
                isSelected ? 'border-accentColor bg-accentColor/10' : ''
              }`}
              style={{
                boxShadow: isSelected ? `${accent_rgba} 0px 10px 25px -6px` : '',
                borderColor: isSelected ? accent_rgba : ''
              }}
              onClick={() => {
                // Stop previous animation if changing selection
                if (animationRefs.current[fieldName]) {
                  animationRefs.current[fieldName].stop();
                }
                formik.setFieldValue(fieldName, option);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `${accent_rgba} 0px 10px 25px -6px`;
                e.currentTarget.style.borderColor = accent_rgba;
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.07) 0px 10px 25px -6px';
                  e.currentTarget.style.borderColor = 'rgba(157, 176, 197, 0.25)';
                }
              }}
            >
              {isSelected && (
                <Player
                  src={option ? '/animations/check.json' : '/animations/wrong.json'}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-8"
                  autoplay
                  loop={false}
                  keepLastFrame={true}
                  ref={(ref) => (animationRefs.current[fieldName] = ref)}
                />
              )}
              <span className="cards-text text-center">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  if (!formData || !contractor) return null;
  
  return (
    <div>
      <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <div className="container-form">
          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-8">
              <div className='flex justify-center text-center mb-8'>
                <div className="max-w-[60rem] text-center">
                  <h1 className="heading-form">
                    Almost There, {firstname}! <span className="text-accentColor">Confirm Your Appointment</span> Now
                  </h1> 
                </div>
              </div>

              <div className="mt-12 flex flex-col h-full">
                {renderQuestion("Are you the homeowner?", "homeowner")}
                {renderQuestion("Will all homeowners be present for at least 60-90 mins?", "HomeOwnersPresent")}
                
                {/* Custom Address Verification Section */}
                <div className="mb-12">
                  <h3 className="text-base sm:text-lg font-medium sm:font-semibold text-center text-gray-800">
                    Is this your current address?
                  </h3>
                  
                  {/* Display Address from URL Parameters */}
                  <div className='flex justify-center'>
                    <div className="my-4 w-96 bg-gray-100 rounded-md pb-4 pt-4 space-y-2">
                      <p className="text-sm sm:text-base text-center text-gray-800">{formData.address1}, {formData.address2 && `${formData.address2},`} 
                      {formData.city}, {formData.state} {formData.zip} </p>
                    </div>
                  </div>
                  

                  {/* Yes/No Buttons */}
                  <div className="flex justify-center gap-4 items-center">
                    {[true, false].map((option) => {
                      const isSelected = formik.values.AddressVerified === option;
                      const label = option ? 'Yes' : 'No';
                      
                      return (
                        <button
                          key={label}
                          type="button"
                          className={`cards-button-small relative ${
                            isSelected ? 'border-accentColor bg-accentColor/10' : ''
                          }`}
                          style={{
                            boxShadow: isSelected ? `${accent_rgba} 0px 10px 25px -6px` : '',
                            borderColor: isSelected ? accent_rgba : ''
                          }}
                          onClick={() => {
                            if (animationRefs.current.address) {
                              animationRefs.current.address.stop();
                            }
                            formik.setFieldValue('AddressVerified', option);
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `${accent_rgba} 0px 10px 25px -6px`;
                            e.currentTarget.style.borderColor = accent_rgba;
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.07) 0px 10px 25px -6px';
                              e.currentTarget.style.borderColor = 'rgba(157, 176, 197, 0.25)';
                            }
                          }}
                        >
                          {isSelected && (
                            <Player
                              src={option ? '/animations/check.json' : '/animations/wrong.json'}
                              className="absolute left-4 top-1/2 -translate-y-1/2 h-8"
                              autoplay
                              keepLastFrame={true}
                              loop={false}
                              ref={(ref) => (animationRefs.current.address = ref)}
                            />
                          )}
                          <span className="cards-text text-center">{label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Address Input Fields for 'No' Answer */}
                  {formik.values.AddressVerified === false && (
                    <div className="mt-8 space-y-4 max-w-lg mx-auto">
                      <h3 className="text-base sm:text-lg font-medium sm:font-semibold text-center text-gray-800">
                        Please provide your current address
                      </h3>
                      <div>
                        <label className="input-label">Address Line 1</label>
                        <input
                          type="text"
                          name="address1"
                          value={formik.values.address1}
                          onChange={formik.handleChange}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="input-label">Address Line 2 (Optional)</label>
                        <input
                          type="text"
                          name="address2"
                          value={formik.values.address2}
                          onChange={formik.handleChange}
                          className="input-field"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="input-label">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="input-label">State</label>
                          <input
                            type="text"
                            name="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="input-label">ZIP Code</label>
                          <input
                            type="text"
                            name="zip"
                            value={formik.values.zip}
                            onChange={formik.handleChange}
                            className="input-field"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="py-3 px-8 bg-accentColor text-white rounded-lg hover:bg-accentDark transition-colors"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? 'Submitting...' : 'Confirm Appointment'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <button id='dialog' className='hidden'></button>
        </DialogTrigger>
        <DialogTitle></DialogTitle>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className='items-center'>
            <ConfirmCheck />
            <h4 className='text-lg sm:text-xl font-semibold text-center py-1'>Awesome!</h4>
            <DialogDescription>
            Your appointment is confirmed! You'll receive updates shortly about your Free Assessment. We look forward to helping you bring your project to life.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild className='items-center'>
              <Button className='bg-accentColor hover:bg-accentDark w-full' onClick={handleRedirect} >OK</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>



  );
};

export default ConfirmationForm;