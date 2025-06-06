"use client";
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import {central} from '@/lib/supabaseClient';
import { Dialog, DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogTitle
} from '@/components/ui/dialog2';
import { Button } from '@/components/ui/button';
import ConfirmCheck from './icons/ConfirmCheck';
import IconComponent from '@/hooks/IconComponent';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns-tz';

interface ConfirmationProps {
  onSchedule: () => void;
  onInfo: () => void;
  onSubmit: () => void;
  onService: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({onSchedule, onInfo, onSubmit, onService }) => {
  const { form, setForm, user, contractor, selectedService, services } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [validAppointment, setValidAppointment] = useState<boolean>(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  
  // Initialize contact preferences
  const [contactPreferences, setContactPreferences] = useState<string[]>(form.contactPreferences || []);

  const capitalizeWords = (str: string | null) => {
    if (!str) return '';
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  // Check if form is valid
  useEffect(() => {
    // Check if all required fields are filled
    if (
      form.date &&
      form.time &&
      selectedService
    ) {
      setValidAppointment(true);
    } else {
      setValidAppointment(false);
    }
    
    // Update contactPreferences state when form changes
    if (form.contactPreferences) {
      setContactPreferences(form.contactPreferences);
    }
  }, [form, user, selectedService]);

  useEffect(() => {
    setForm(prevForm => ({
      ...prevForm,
      promo: capitalizeWords(params.get('promo')),
      serviceSpecification: capitalizeWords(selectedService?.specifications[0]),
    }));
  }, [ location.search, setForm ]);

  useEffect(() => {
    if (form.timezone) {
      setForm(prevForm => ({
        ...prevForm,
        timezoneAbbr: format(new Date(), 'zzz', { timeZone: form.timezone || '' })
      }));
    }
  }, [form.timezone, setForm]);

  const payload = {
    user,
    form,
    contractor,
    selectedService,
    contactPreferences,
    consent: {
      general: {
        description: 'By checking the box above, I provide my ESIGN and express written consent for {appContext.contractor.name} and its authorized partners to contact me at the phone number and email address I have provided in this form. This may include marketing communications sent using automated technology, such as calls, texts, or emails. I understand that this consent is not required to make a purchase.',
        value: form.generalOptIn,
      },
    },
    type: 'stl',
  };

  const handleConfirmBooking = async () => {
		setLoading(true);

		try {
      const response = await fetch('https://hkdk.events/w8wqxy2op6oty4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to send appointments');
      }
    } catch (err) {
      console.error('Error sending appointments:', err);
    }

	  // insert data into bookings table
		try {
			const { data, error } = await central
				.from('bookings')
				.insert([
					{
						firstname: user.firstname,
						lastname: user.lastname,
						email: user.email,
						phone: user.phone,
						address1: user.address1,
						address2: user.address2,
						city: user.city,
						state: user.state,
						zip: user.zip,
						user_ns: user.userNs,
            market: user.market,
						id: form.formId,
						service_specification: form.serviceSpecification,
						promo: form.promo,
						opt_in: form.generalOptIn,
						date: form.date,
						time: form.time,
						service_name: selectedService.name || selectedService.services.name,
						service_id: selectedService.service_id,
            is_booked: true,
            timezone: form.timezone,
            contractor_id: contractor.id,
            selected_service: selectedService,
            timezoneAbbr: form.timezoneAbbr,
            contact_preferences: contactPreferences,
					},
				]);
	
			if (error) {
				console.error('Error inserting data:', error);
			} else {
				console.log('Data inserted successfully:', data);
        setLoading(false);
			}
      document.getElementById("dialog")?.click();
		} catch (err) {
			console.error('Unexpected error:', err);
		}	
	};

  const formatDate = (dateString: string) => {
    // Split the stored yyyy-MM-dd format into components
    const [year, month, day] = dateString.split('-').map(Number);
    // Create a Date object using LOCAL time components
    const date = new Date(year, month - 1, day); // months are 0-based in JS
    
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };
  
  const formatTime = (timeString: any) => {
    // Split the time string into hours and minutes
    const [hourStr, minuteStr] = timeString.split(':');
    let hour = parseInt(hourStr, 10);
    const minutes = minuteStr || '00'; // Default to '00' if no minutes part
  
    // Determine AM or PM period
    const period = hour >= 12 ? 'PM' : 'AM';
  
    // Convert hour to 12-hour format
    if (hour === 0) {
      hour = 12; // Midnight case
    } else if (hour > 12) {
      hour -= 12; // Convert to 12-hour format
    }
  
    return `${hour}:${minutes} ${period}`;
  };

  const formatPhoneNumber = (phone: any) => {
    if (!phone || phone.length !== 10) {
      return phone;
    }
  
    const areaCode = phone.slice(0, 3);
    const centralOfficeCode = phone.slice(3, 6);
    const lineNumber = phone.slice(6);
  
    return `+1 (${areaCode}) ${centralOfficeCode}-${lineNumber}`;
  };

  const handleGeneralOptInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      generalOptIn: checked
    }));
  };

  const toggleContactPreference = (preference: string) => {
    const updatedPreferences = contactPreferences.includes(preference) 
      ? contactPreferences.filter(p => p !== preference)
      : [...contactPreferences, preference];
    
    setContactPreferences(updatedPreferences);
    setForm(prevForm => ({
      ...prevForm,
      contactPreferences: updatedPreferences
    }));
  };

  const handleRedirect = () => {
    console.log('Redirecting to thank you page');
    onSubmit();
  };

  if (!selectedService || !user || !contractor) {
    return null;
  }

  return (
		<div className='bg-gray-50'>
			<div className="container-form">

				<div className="space-y-4 sm:space-y-8">
					<div className='flex justify-center text-center'>
						<div className="max-w-[60rem] text-center">
              {validAppointment ? (
                <h1 className="heading-form">
                  Almost There, {user.firstname}! <span className="text-accentColor">Request Your Appointment</span> Now
                </h1>
              ) : (
                <h1 className="heading-form">
                  Hi, {user.firstname}, <span className="text-accentColor">ready to get started</span>? Book your consultation today!
                </h1> )
              }
              <p className="hidden sm:block section_description text-center mt-2 sm:mt-4">Get expert guidance tailored to your needs—schedule your appointment at your convenience</p>
            </div>
          </div>

					<div className="flex justify-center mt-10"> 
						<div className="flex flex-wrap gap-4 max-w-screen-lg w-full sm:px-8">
						<div className="flex flex-col gap-4 flex-grow min-w-[250px] w-[600px] max-w-[100%]">
								<div className="bg-white border border-gray-200 rounded-md">
									<div className="text-left mx-4 my-4">
										<div className="flex items-center">
										<div className="flex items-center text-yellow-500 mb-3">
                        <svg id="fi_9759344" enableBackground="new 0 0 32 32" height="24" viewBox="0 0 32 32" width="24" xmlns="http://www.w3.org/2000/svg"
                        className='text-yellow-500 h-5'>
                          <g>
                            <path d="m28.8 9-5.8-5.8c-.8-.8-1.8-1.2-2.9-1.2h-8.3c-1 0-2 .4-2.8 1.2l-5.8 5.8c-.8.8-1.2 1.8-1.2 2.9v8.3c0 1.1.4 2.1 1.2 2.8l5.8 5.8c.8.7 1.8 1.2 2.8 1.2h8.3c1.1 0 2.1-.4 2.8-1.2l5.9-5.9c.7-.8 1.2-1.8 1.2-2.8v-8.3c0-1-.4-2-1.2-2.8z" fill="#ffc107"></path>
                            <path d="m15.8 24.7c-2.3.1-1.9-3.9.3-3.4 2.3-.1 2 3.9-.3 3.4zm.2-5.5c-.6 0-.9-.3-.9-1l-.7-9.2c-.1-.9.6-1.7 1.5-1.8s1.7.6 1.8 1.5v.3l-.7 9.2c-.1.7-.4 1-1 1z" fill="#eee"></path>
                          </g>
                        </svg>
                        <p className="text-base sm:text-lg font-semibold ml-2">Pending Request</p>
                      </div>
                    </div>
										<hr className='mb-4'></hr>
										<div className="flex items-center mb-4 ml-4 md:ml-8 min-w-52">
                    <div className="flex items-center w-full">
                      <IconComponent name={selectedService.name || selectedService.services.name} className="w-14 h-14" />
                      <div className="flex flex-wrap justify-between flex-grow">
                        <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-white pl-2 sm:pl-6 pr-4">
                          {selectedService.name || selectedService.services.name} {form.serviceSpecification || "Service"}
                        </h3>
                        {services && services.length > 1 && (
                          <button onClick={onService} className='ml-auto text-accentColor hover:text-accentDark'>Edit</button>

                        )}
                        
                      </div>
                    </div>
                    </div>
                    {/* Schedule */}
                    
                    {/* If form.promo exists or is not empty, show this div */}
                    {form.promo && (
                      <div>
                        <hr className='mb-4'></hr>
                        <p className="text-sm font-semibold text-gray-800 mb-3">Promo</p>
                        <div className="flex flex-wrap justify-between my-4 w-auto bg-green-100 rounded-md py-4">
                        <div className="flex items-center px-4 sm:px-8 min-w-[200px]">
                          <i className="fi fi-rr-ticket flex text-green-800 items-center text-center mr-2 h-5"></i>
                          <p className=" text-sm sm:text-base text-green-800">{form.promo}</p>
                        </div>
                      </div>

                      </div>
                    )}
                    
                    
                    
                    {form.date && form.time && (
                      <div>
                        <hr className='mb-4'></hr>
                        <div className='flex mb-3'>
                          <p className="text-sm font-semibold text-gray-800 ">Scheduled Date and Time</p>
                          <button onClick={onSchedule} className='ml-auto text-accentColor hover:text-accentDark'>Edit</button>
                        </div>
                        <div className="my-4 w-auto bg-gray-100 rounded-md pb-4 pt-4 space-y-2">
                          <div className='flex flex-wrap items-center justify-between' >
                            <div className="flex items-center pl-4 sm:pl-8 pr-8 min-w-[200px]">
                              <img src="/images/calendar.svg" alt="Calendar" className="inline mr-2 h-5" />
                              <p className="text-sm sm:text-base text-gray-800">{formatDate(form.date)}</p>
                            </div>

                            <div className="hidden sm:flex items-center pl-4 pr-8">
                              <img src="/images/clock.svg" alt="Clock" className="inline mr-2 h-5" />
                              <p className="text-sm sm:text-base text-gray-800">{formatTime(form.time)}</p>
                              
                              {form.timezone && ( 
                                <div className='flex items-center'>
                                  <img src="/images/globe.svg" alt="Clock" className="inline ml-4 mr-2 h-5" />
                                  <p className="text-sm sm:text-base text-gray-800">{form.timezoneAbbr}</p>
                                </div>)}

                            </div>
                          </div>

                          <div className='sm:hidden pr-8 space-y-2'>
                            <div className="flex items-center pl-4 pr-8">
                              <img src="/images/clock.svg" alt="Clock" className="inline mr-2 h-5" />
                              <p className="text-sm sm:text-base text-gray-800">{formatTime(form.time)} </p>
                            </div>

                            {form.timezone && (  
                              <div className="flex items-center pl-4 pr-8">
                                <img src="/images/globe.svg" alt="Clock" className="inline mr-2 h-5" />
                                <p className="text-sm sm:text-base text-gray-800">{form.timezoneAbbr}</p>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                </div>
								
							</div>

							<div className="flex-grow min-w-[250px] max-w-[100%] bg-white border border-gray-200 rounded-md h-auto">
								<div className='text-left mx-4 my-4'>
                  <div className="flex items-center mb-3">
                    <p className='text-base sm:text-lg font-semibold text-gray-800 '>Customer Information</p>
                    <button onClick={onInfo} className='ml-auto text-accentColor hover:text-accentDark'>Edit</button>
                  </div>
									<hr className='mb-4'></hr>
									<p className='text-sm sm:text-base text-gray-800 mb-3'>
										<img src="/images/user.svg" alt="User" className="inline mr-2 h-5" />
										{user.firstname} {user.lastname}
									</p>
									<p className='text-sm sm:text-base text-gray-800 mb-3'>
										<img src="/images/mail.svg" alt="Email" className="inline mr-2 h-5 " />
										{user.email}
									</p>
									<p className='text-sm sm:text-base text-gray-800 item-center mb-3'>
										<img src="/images/telephone.svg" alt="Phone" className="inline mr-2 h-5" />
										{formatPhoneNumber(user.phone)}
									</p>
									<p className='text-sm sm:text-base text-gray-800 mb-3'>
										<img src="/images/home.svg" alt="Location" className="inline mr-2 h-5" />
										{user.address2 ? `${user.address1}, ${user.address2}` : `${user.address1}`}
									</p>
									<p className='text-sm sm:text-base text-gray-800 mb-3'>
										<img src="/images/city.svg" alt="Location" className="inline mr-2 h-5" />
										{user.city}
									</p>
									<p className='text-sm sm:text-base text-gray-800 mb-3'>
										<img src="/images/location.svg" alt="Location" className="inline mr-2 h-5" />
										{user.state} {user.zip}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-4 pb-4 flex justify-center items-center sticky bottom-0 bg-gray-50">
            {validAppointment ? 
            (
              <div className="justify-center sm:mx-8 w-[960px]">
                {/* Contact Preferences Section */}
                <div className="mt-6 mb-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">How would you prefer to be contacted?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* SMS Option */}
                    <div 
                      className={`flex relative items-center cursor-pointer p-4 rounded-xl border-2 ${contactPreferences.includes('sms') 
                        ? 'bg-indigo-50 border-indigo-500' 
                        : 'bg-white border-gray-200'}`}
                      onClick={() => toggleContactPreference('sms')}
                    >
                      <div className="flex">
                        <div className="mr-4 flex-shrink-0 w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="text-base font-semibold text-gray-900">SMS</h4>
                          <p className="text-sm text-gray-500">Reach you via text</p>
                        </div>
                      </div>
                      {contactPreferences.includes('sms') && (
                        <div className="absolute right-4 flex-shrink-0 h-7 w-7 bg-indigo-600 rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Call Option */}
                    <div 
                      className={`flex relative items-center cursor-pointer p-4 rounded-xl border-2 ${contactPreferences.includes('call') 
                        ? 'bg-indigo-50 border-indigo-500' 
                        : 'bg-white border-gray-200'}`}
                      onClick={() => toggleContactPreference('call')}
                    >
                      <div className="flex">
                        <div className="mr-4 flex-shrink-0 w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="text-base font-semibold text-gray-900">Call</h4>
                          <p className="text-sm text-gray-500">Speak on the phone</p>
                        </div>
                      </div>
                      {contactPreferences.includes('call') && (
                        <div className="absolute right-4 flex-shrink-0 h-7 w-7 bg-indigo-600 rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Email Option */}
                    <div 
                      className={`flex relative items-center cursor-pointer p-4 rounded-xl border-2 ${contactPreferences.includes('email') 
                        ? 'bg-indigo-50 border-indigo-500' 
                        : 'bg-white border-gray-200'}`}
                      onClick={() => toggleContactPreference('email')}
                    >
                      <div className="flex">
                        <div className="mr-4 flex-shrink-0 w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="text-base font-semibold text-gray-900">Email</h4>
                          <p className="text-sm text-gray-500">Get info via email</p>
                        </div>
                      </div>
                      {contactPreferences.includes('email') && (
                        <div className="absolute right-4 flex-shrink-0 h-7 w-7 bg-indigo-600 rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="generalOptIn"
                    name="generalOptIn"
                    checked={form.generalOptIn}
                    onChange={handleGeneralOptInChange}
                    className="size-4 rounded border-gray-300 text-accentColor focus:ring-accentColor"
                  />
                  <label htmlFor="generalOptIn" className="ml-4 block text-sm sm:text-base text-gray-900 dark:text-gray-300">{!form.generalOptIn && <span className="text-red-500">* </span>}
                  Yes, I agree to receiving updates about my free assessment. I understand that I can opt-out anytime.
                  </label>
                </div>
                <button
                  onClick={handleConfirmBooking}
                  className={`mt-4 w-full py-5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent ${
                    form.generalOptIn && validAppointment
                          ? 'bg-accentColor text-white hover:bg-accentDark transform transition-transform'
                          : 'bg-gray-200 text-white cursor-not-allowed'
                      }`}
                      disabled={loading || !form.generalOptIn || !validAppointment}  // Disable button if generalOptIn is not true
                >
                  {loading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    'Request Appointment'
                  )}
                </button>
              </div>
            ) : (
              <div className="justify-center sm:mx-8 w-[960px]">
                <p className="text-center text-sm text-gray-600 dark:text-neutral-400 mt-4">
                You’re just one step away from getting expert advice tailored to your needs. Pick a date and time that works for you, and we’ll take care of the rest. It’s quick, easy, and completely hassle-free!
                </p>

                <button
                      onClick={onSchedule}
                        className='mt-4 w-full py-5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-accentColor text-white hover:bg-accentDark transform transition-transform'
                        disabled={loading }
                      >
                        {loading ? (
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        ) : (
                          'Select Date and Time'
                        )}
                      </button>
              </div>
            )
          }

					</div>
				</div>
        <div className="mt-2 sm:mt-4 flex justify-center items-center">
          <div className="justify-center sm:mx-8 w-[960px]">
            {form.generalOptIn && (
              <div> 
                <div className="text-sm text-gray-600 dark:text-neutral-400">
                  By checking the box above, I provide my ESIGN and express written consent for {contractor.name} and its authorized partners to contact me at the phone number and email address I have provided in this form. This may include marketing communications sent using automated technology, such as calls, texts, or emails. I understand that this consent is not required to make a purchase.
                </div>
              </div>
            )}
          </div>
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
						Your booking has been requested, and you will receive updates shortly regarding your Free Assessment. We look forward to helping you bring your project to life.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild className='items-center'>
              <Button className='bg-accentColor hover:bg-accentDark w-full' onClick={handleRedirect}>OK</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
		</div> 
  );
};

export default Confirmation;
