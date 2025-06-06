"use client";
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useAppContext } from '@/context/AppContext';
import { Calendar } from '@/components/ui/calendar';
import { format as localFormat, getDay } from 'date-fns';
import BlurFade from '@/components/ui/blur-fade';
import NavButtons from '../ui/navButtons';
import { format } from 'date-fns-tz';


interface DateAndTimeProps {
  onNext: () => void;
  onReset: () => void;
  onBack: () => void;
}

// Define a type for the valid keys of the timeSlots object
type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

const DateAndTime: React.FC<DateAndTimeProps> = ({ onNext, onReset, onBack }) => {
  const { form, setForm, contractor } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false); // State to control spinner
  const [selectedDayTimeSlots, setSelectedDayTimeSlots] = useState<string[]>([]); // State to store time slots for the selected day

  // Updated time slots to use an object with days of the week as keys
  const defaultTimeSlots: Record<DayOfWeek, string[]> = {
    Monday: ['10:00', '13:00', '14:00', '15:00', '17:00', '18:00'],
    Tuesday: ['13:00', '14:00', '16:00', '17:00', '20:00'],
    Wednesday: ['11:00', '13:00', '14:00', '15:00', '18:00', '19:00'],
    Thursday: ['13:00', '14:00', '16:00', '17:00', '20:00'],
    Friday: ['11:00', '13:00', '14:00', '15:00', '18:00', '19:00'],
    Saturday: ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    Sunday: [], // No time slots for Sunday
  };

  useEffect(() => {
    if (contractor.timezone?.length > 0 ) {
      setForm(prev => ({
        ...prev,
        timezone: contractor.timezone[0]
      }));
    }
  }, [contractor.timezone, setForm]);

  // Parse contractor.time_slots if it exists, otherwise use defaultTimeSlots
  const timeSlots: Record<DayOfWeek, string[]> = contractor.time_slots
    ? contractor.time_slots // Parse JSONB data
    : defaultTimeSlots;

  const formik = useFormik({
    initialValues: {
      date: form.date || '', 
      time: form.time || '',
    },
    validate: (values) => {
      const errors: { date?: string; time?: string } = {};
      if (!values.date) {
        errors.date = 'Date is required';
      }
      if (!values.time) {
        errors.time = 'Time is required';
      }
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true); // Show spinner

      setForm((prevForm) => ({
        ...prevForm,
        date: values.date,
        time: values.time,
      }));

      setLoading(false); // Hide spinner
      onNext();
    },
  });
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const formattedDate = localFormat(date, 'yyyy-MM-dd');
      formik.setFieldValue('date', formattedDate);
  
      const dayOfWeek = getDay(date);
      const days: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const selectedDay = days[dayOfWeek];
      const newTimeSlots = timeSlots[selectedDay];
  
      setSelectedDayTimeSlots(newTimeSlots);
  
      // Clear invalid time selection
      if (formik.values.time && !newTimeSlots.includes(formik.values.time)) {
        formik.setFieldValue('time', '');
        setRawTime('');
      }
    }
  };

  const [rawTime, setRawTime] = useState<string>(form.time || '');

  useEffect(() => {
    setRawTime(form.time || '');
  }, [form.time]);

  // Function to convert 24-hour time to 12-hour time
  const convertTo12HourFormat = (time: string): string => {
    const [hour, minute] = time.split(':');
    const parsedHour = parseInt(hour, 10);
    const suffix = parsedHour >= 12 ? 'PM' : 'AM';
    const twelveHour = parsedHour % 12 || 12;
    return `${twelveHour}:${minute} ${suffix}`;
  };

  const handleTimeSelect = (time: string) => {
    setRawTime(time);
    formik.setFieldValue('time', time);
  };
  // Set initial time slots based on the current day
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = getDay(today);
    const days: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[dayOfWeek];

    setSelectedDayTimeSlots(timeSlots[currentDay]);
  }, [timeSlots]);

  // Normalize holiday dates to midnight in the LOCAL timezone
  const disabledDates = contractor.disabled_dates;
  const holidays = disabledDates.holidays.map((dateStr: string) => {
    const [datePart] = dateStr.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    return new Date(year, month - 1, day); // Months are 0-based
  });

  return (
    <div className="container-form">
      <NavButtons handleBack={onBack} handleReset={onReset} />
      <div className="max-w-xl mx-auto">
        <div className='flex justify-center text-center mb-8'>
          <div className="max-w-[40rem] text-center">
            <h1 className="heading-form">
            Pick a  
            <span className="text-accentColor"> date and time</span> that works for you
            </h1>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4 rounded-lg px-4 py-4 shadow-lg sm:px-6 sm:py-4 lg:px-8 bg-white">
            <BlurFade delay={0.1} duration={0.4} blur='0px' inView yOffset={0} className="flex-grow">
              {/* Show timezone abbreviation */}
              {/* <div className="mt-0 text-center text-gray-700 dark:text-neutral-200 justify-center items-center">
                <div className='flex justify-center items-center'>
                  <img src="/images/globe.svg" alt="Clock" className="inline ml-0 mr-2 h-5" />
                  <p>
                    <span className="text-base text-gray-800">{timezoneAbbr}</span>
                  </p>
                </div>
              </div> */}
              <div className="mt-0 text-center text-gray-700 dark:text-neutral-200 justify-center items-center">
                <div className='flex justify-center items-center'>
                  <img src="/images/globe.svg" alt="Clock" className="inline ml-0 mr-2 h-5" />
                  {contractor.timezone.length > 1 ? (
                    <select 
                      value={form.timezone || ''}
                      onChange={(e) => setForm(prev => ({ 
                        ...prev, 
                        timezone: e.target.value 
                      }))}
                      className="bg-transparent border-none text-base text-gray-800 focus:outline-none"
                    >
                      {contractor.timezone.map((tz: string) => (
                        <option key={tz} value={tz}>
                          {format(new Date(), 'zzz', { timeZone: tz })}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-base text-gray-800">
                      {format(new Date(), 'zzz', { timeZone: contractor.timezone[0] })}
                    </p>
                  )}
                </div>
              </div>
              <h2 className="text-center mt-2 mb-4 text-base sm:text-xl font-semibold text-gray-800 dark:text-neutral-200">
                Select a date
              </h2>
              <div className="flex justify-center mb-4">
                <div className="rounded-lg small-stepper:border small-stepper:border-gray-300 small-stepper:p-4 small-stepper:shadow-xl sm:p-6 lg:p-8 small-stepper:bg-white">
                  <Calendar
                    mode="single"
                    selected={
                      formik.values.date
                        ? new Date(
                            // Split the stored date string into parts and create a local Date
                            Number(formik.values.date.split('-')[0]), // Year
                            Number(formik.values.date.split('-')[1]) - 1, // Month (0-based)
                            Number(formik.values.date.split('-')[2]) // Day
                          )
                        : undefined
                    }
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={[
                      // Disable dates before today
                      { before: new Date(new Date().setHours(0, 0, 0, 0)) },
                      // Disable dynamic "from" range
                      { 
                        from: new Date(), 
                        to: new Date(new Date().setDate(new Date().getDate() + disabledDates.from)) 
                      },
                      // Disable dynamic "after" range
                      { after: new Date(new Date().setDate(new Date().getDate() + disabledDates.after)) },
                      // Disable specific holidays
                      ...holidays
                    ]}
                  
                  />
                </div>
              </div>

              <h2 className="text-center mt-6 mb-4 text-base sm:text-xl font-semibold text-gray-800 dark:text-neutral-200">
                Select Time
              </h2>
              {formik.values.date ? ( // Check if a date has been selected
                selectedDayTimeSlots.length > 0 ? (
                  <div
                    className="flex flex-wrap justify-center pb-2"
                    style={{ gap: '10px', marginTop: '15px', width: '100%' }}
                  >
                    {selectedDayTimeSlots.map((time: string) => (
                      <button
                        key={time}
                        type="button"
                        className={`py-3 px-4 w-28 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300  ${
                          rawTime === time ? 'bg-accentColor text-white border-accentColor hover:bg-accentColor' : 'bg-white text-gray-800 hover:bg-gray-100'
                        }`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {convertTo12HourFormat(time)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-700 dark:text-neutral-200">
                    No time slots available for the selected date.
                  </div>
                )
              ) : (
                <div className="text-center text-sm sm:text-base text-gray-700 dark:text-neutral-200">
                  Please select a date to view available time slots.
                </div>
              )}

              
            
            </BlurFade>
          </div>
          <div className="mt-4 flex flex-col space-y-4 sticky bottom-4">
            <button
              type="submit"
              className={`w-full py-5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent plausible-event-name=form_step_complete plausible-event-form_step=4_schedule ${
                formik.values.date && formik.values.time
                  ? 'bg-accentColor text-white hover:bg-accentDark transform transition-transform'
                  : 'bg-gray-200 text-white cursor-not-allowed'
              }`}
              disabled={!formik.values.date || !formik.values.time}
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DateAndTime;
