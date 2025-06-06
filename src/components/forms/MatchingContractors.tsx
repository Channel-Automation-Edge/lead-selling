import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { central } from '@/lib/supabaseClient';
import BlurFade from '@/components/ui/blur-fade';
import { format as localFormat, getDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Drawer } from '@/components/ui/drawer';

interface MatchingContractorsProps {
  onNext: () => void;
}

// Type for the day of week
type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface Appointment {
  contractor_id: string;
  date: string;
  time: string;
}

const MatchingContractors: React.FC<MatchingContractorsProps> = ({ onNext }) => {
  const { user, matchingContractors, setMatchingContractors, form, setForm } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedContractor, setSelectedContractor] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDayTimeSlots, setSelectedDayTimeSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [drawerLoading, setDrawerLoading] = useState<boolean>(false);

  // Used for calendar disabled dates logic
  const disabledDates = { from: 0, after: 30 }; // Available from today up to 30 days from now

  // Default time slots per day
  const defaultTimeSlots: Record<DayOfWeek, string[]> = {
    Monday: ['10:00', '13:00', '14:00', '15:00', '17:00', '18:00'],
    Tuesday: ['13:00', '14:00', '16:00', '17:00', '20:00'],
    Wednesday: ['11:00', '13:00', '14:00', '15:00', '18:00', '19:00'],
    Thursday: ['13:00', '14:00', '16:00', '17:00', '20:00'],
    Friday: ['11:00', '13:00', '14:00', '15:00', '18:00', '19:00'],
    Saturday: ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    Sunday: [], // No time slots for Sunday
  };

  // Fetch contractors from Supabase
  const { selectedService } = useAppContext();

  useEffect(() => {
    const fetchContractors = async () => {
      if (!selectedService || !selectedService.service_id || !user.zip) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        console.log('Fetching contractors for service ID:', selectedService.service_id);
        console.log('User ZIP:', user.zip);
        
        // Fetch contractor_services rows matching the selected service ID
        // and join with contractors table to get more info
        const { data, error } = await central
          .from('contractor_services')
          .select(`
            id, 
            contractor_id,
            service_id,
            zips_available,
            contractors:contractor_id (id, name, content, favicon, timezone)
          `)
          .eq('service_id', selectedService.service_id);
        
        if (error) {
          console.error('Error fetching contractor services:', error);
          return;
        }

        if (data) {
          console.log('Data received from Supabase:', data);
          console.log('User ZIP code:', user.zip);
          
          // Show raw data for debugging
          data.forEach(service => {
            console.log(`Service ID ${service.id}: contractor_id=${service.contractor_id}, zips:`, service.zips_available);
          });
          
          // Filter by matching zip code in zips_available array
          const filteredContractors = data.filter(service => {
            if (!service.zips_available) {
              console.log(`Service ${service.id}: No zips_available array`);
              return false;
            }
            
            if (!Array.isArray(service.zips_available)) {
              console.log(`Service ${service.id}: zips_available is not an array:`, service.zips_available);
              return false;
            }
            
            if (service.zips_available.length === 0) {
              console.log(`Service ${service.id}: zips_available is empty array`);
              return false;
            }
            
            // Ensure both are strings and trim any whitespace
            const userZip = String(user.zip || '').trim();
            if (!userZip) {
              console.log('User ZIP is empty');
              return false;
            }
            
            // Debug each comparison
            console.log(`Checking service ${service.id} with ZIPs:`, service.zips_available);
            
            // More robust comparison - check if any ZIP in the array matches the user's ZIP
            const hasMatch = service.zips_available.some(zip => {
              if (zip === null || zip === undefined) return false;
              
              const serviceZip = String(zip).trim();
              const matches = serviceZip === userZip;
              console.log(`Comparing: '${serviceZip}' with '${userZip}' => ${matches ? 'MATCH' : 'no match'}`);
              return matches;
            });
            
            console.log(`Service ${service.id} match result:`, hasMatch);
            return hasMatch;
          });
          
          console.log('Filtered contractors count:', filteredContractors.length);
          
          // Transform the data for display
          const transformedContractors = filteredContractors.map(service => {
            // Transform data to match the expected format
            const contractor = service.contractors as any; // Type casting to fix TS error
            const result = {
              id: service.contractor_id,
              service_id: service.service_id,
              name: contractor?.name || 'Unknown Provider',
              content: contractor?.content || '',
              favicon: contractor?.favicon || '',
              timezone: contractor?.timezone || '',
              zips_available: service.zips_available || []
            };
            console.log('Transformed contractor:', result);
            return result;
          });
          
          setMatchingContractors(transformedContractors);

          // This line is replaced by the code above
        }
      } catch (error) {
        console.error('Error in fetchContractors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContractors();
  }, [user.zip, selectedService, setMatchingContractors]);

  // Function to convert 24-hour time to 12-hour time
  const convertTo12HourFormat = (time: string): string => {
    const [hour, minute] = time.split(':');
    const parsedHour = parseInt(hour, 10);
    const suffix = parsedHour >= 12 ? 'PM' : 'AM';
    const twelveHour = parsedHour % 12 || 12;
    return `${twelveHour}:${minute} ${suffix}`;
  };

  // Handle opening the drawer for a specific contractor
  const handleScheduleQuote = (contractor: any) => {
    setSelectedContractor(contractor);
    setIsDrawerOpen(true);
  };

  // Handle date selection in the calendar
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const dayOfWeek = getDay(date);
      const days: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const selectedDay = days[dayOfWeek];
      
      // Get time slots for the selected day
      const timeSlots = selectedContractor?.time_slots 
        ? selectedContractor.time_slots[selectedDay] 
        : defaultTimeSlots[selectedDay];
      
      setSelectedDayTimeSlots(timeSlots || []);
      setSelectedTime('');
    }
  };

  // Handle time slot selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Handle submission of a scheduled appointment
  const handleSelectAppointment = () => {
    if (!selectedContractor || !selectedDate || !selectedTime) return;
    
    setDrawerLoading(true);
    
    try {
      // Format the date to string
      const formattedDate = localFormat(selectedDate, 'yyyy-MM-dd');
      
      // Create the new appointment
      const newAppointment: Appointment = {
        contractor_id: selectedContractor.id,
        date: formattedDate,
        time: selectedTime
      };
      
      // Update form context to store appointments
      const updatedAppointments = [...(form.appointments || [])];
      
      // Check if there is already an appointment with this contractor
      const existingIndex = updatedAppointments.findIndex(
        app => app.contractor_id === selectedContractor.id
      );
      
      if (existingIndex >= 0) {
        // Replace existing
        updatedAppointments[existingIndex] = newAppointment;
      } else {
        // Add new
        updatedAppointments.push(newAppointment);
      }
      
      // Save to app context
      setForm(prev => ({
        ...prev,
        appointments: updatedAppointments
      }));
      
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    } finally {
      setDrawerLoading(false);
      setIsDrawerOpen(false);
    }
  };

  // Check if a contractor has an appointment scheduled
  const hasAppointment = (contractorId: string) => {
    return (form.appointments || []).some(app => app.contractor_id === contractorId);
  };
  
  // Get appointment details for a contractor
  const getAppointmentDetails = (contractorId: string) => {
    return (form.appointments || []).find(app => app.contractor_id === contractorId);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <BlurFade delay={0.15} inView yOffset={0}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              Professionals in Your Area
            </h2>
            <p className="mt-3 text-base text-gray-600 sm:mt-4">
              These professionals serve {user.zip} and are ready to help with your project.
            </p>
          </div>
        </BlurFade>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-10 w-10 border-4 border-accentColor border-t-transparent rounded-full"></div>
          </div>
        ) : !selectedService ? (
          <BlurFade delay={0.3} inView yOffset={0}>
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-lg text-gray-700 font-medium mb-4">
                No service selected
              </p>
              <p className="text-gray-500">
                Please go back and select a service first.
              </p>
            </div>
          </BlurFade>
        ) : matchingContractors && matchingContractors.length > 0 ? (
          <BlurFade delay={0.3} inView yOffset={0}>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {matchingContractors.map((contractor: any) => (
                <div 
                  key={contractor.id} 
                  className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100"
                >
                  <div className="p-4 flex flex-col space-y-4">
                    {/* Row 1 - Logo (centered) */}
                    <div className="flex justify-center items-center">
                      <img 
                        src={contractor?.content?.logo || 'https://via.placeholder.com/120'} 
                        alt={`${contractor.name} logo`}
                        className="h-24 w-auto object-contain"
                      />
                    </div>
                    
                    {/* Row 2 - Name */}
                    <h3 className="text-lg font-semibold text-gray-900 text-center">{contractor.name}</h3>
                    
                    {/* Row 3 - Stars */}
                    <div className="flex items-center justify-center">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg key={index} className="w-4 h-4 text-accentColor" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09L5.5 10.18 1 6.18l5.932-.862L10 1l3.068 4.318L19 6.18l-4.5 4L15.878 18z" />
                        </svg>
                      ))}
                    </div>
                    
                    {/* Row 4 - Button or Appointment Details */}
                    <div>
                      {hasAppointment(contractor.id) ? (
                        <div>
                          {/* Appointment details display */}
                          <div className="mb-2 bg-green-50 p-3 rounded-md">
                            <p className="text-sm text-gray-700 font-medium text-center">Appointment scheduled:</p>
                            <p className="text-sm text-gray-800 text-center">
                              {(() => {
                                const appointment = getAppointmentDetails(contractor.id);
                                if (appointment) {
                                  const date = new Date(appointment.date);
                                  return (
                                    `${date.toLocaleDateString()} at ${convertTo12HourFormat(appointment.time)}`
                                  );
                                }
                                return 'No date selected';
                              })()}
                            </p>
                          </div>
                          {/* Change button */}
                          <button
                            type="button"
                            className="w-full py-2 px-3 inline-flex justify-center items-center text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                            onClick={() => handleScheduleQuote(contractor)}
                          >
                            Change Appointment
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-accentColor text-white hover:bg-accentDark transform transition-transform"
                          onClick={() => handleScheduleQuote(contractor)}
                        >
                          Schedule Free Quote
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BlurFade>
        ) : (
          <BlurFade delay={0.3} inView yOffset={0}>
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-lg text-gray-700 font-medium mb-4">
                No professionals found for ZIP code {user.zip}
              </p>
              <p className="text-gray-500">
                Try entering a different ZIP code or check back later.
              </p>
            </div>
          </BlurFade>
        )}

        {/* Continue button */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onNext}
            className={`w-full py-5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent ${
              (form.appointments && form.appointments.length > 0)
                ? 'bg-accentColor text-white hover:bg-accentDark transform transition-transform' 
                : 'bg-gray-200 text-white cursor-not-allowed'
            }`}
            disabled={!(form.appointments && form.appointments.length > 0)}
          >
            Continue
          </button>
        </div>
      </div>

      {/* Bottom drawer for calendar and time selection */}
      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      >
        <Drawer.Content>
          {/* Scrollable container with overflow handling */}
          <div className="max-h-[85vh] overflow-auto scrollbar-hide">
            <div className="container mx-auto px-4 py-6 max-w-lg">
              <Drawer.Header className="text-center mb-6">
                <Drawer.Title className="text-xl font-semibold">
                  Schedule with {selectedContractor?.name}
                </Drawer.Title>
                <Drawer.Description className="text-gray-600">
                  Select a date and time for your free quote
                </Drawer.Description>
              </Drawer.Header>
              
              {/* Calendar section */}
              <div className="mb-6">
                <h3 className="text-center mb-4 font-medium">Select Date</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateChange}
                  initialFocus
                  disabled={[
                    // Disable dates before today
                    { before: new Date(new Date().setHours(0, 0, 0, 0)) },
                    // Disable dates too far in the future
                    { 
                      from: new Date(), 
                      to: new Date(new Date().setDate(new Date().getDate() + disabledDates.from)) 
                    },
                    { after: new Date(new Date().setDate(new Date().getDate() + disabledDates.after)) },
                  ]}
                  className="mx-auto"
                />
              </div>
              
              {/* Time slots section */}
              <div className="mb-6">
                <h3 className="text-center mb-4 font-medium">Select Time</h3>
                {selectedDate ? (
                  selectedDayTimeSlots.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-2">
                      {selectedDayTimeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          className={`py-3 px-4 w-28 inline-flex justify-center items-center text-sm font-medium rounded-lg border ${
                            selectedTime === time 
                              ? 'bg-accentColor text-white border-accentColor' 
                              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                          }`}
                          onClick={() => handleTimeSelect(time)}
                        >
                          {convertTo12HourFormat(time)}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-600">
                      No time slots available for the selected date.
                    </div>
                  )
                ) : (
                  <div className="text-center text-gray-600">
                    Please select a date to see available times.
                  </div>
                )}
              </div>
              
              {/* Add padding at the bottom to prevent content from being hidden behind the sticky button */}
              <div className="h-24"></div>
            </div>
          </div>
          
          {/* Sticky confirmation button */}
          <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <button
              type="button"
              onClick={handleSelectAppointment}
              className={`w-full py-5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent ${
                selectedDate && selectedTime 
                  ? 'bg-accentColor text-white hover:bg-accentDark' 
                  : 'bg-gray-200 text-white cursor-not-allowed'
              }`}
              disabled={!selectedDate || !selectedTime || drawerLoading}
            >
              {drawerLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                hasAppointment(selectedContractor?.id) ? 'Update Appointment' : 'Schedule Appointment'
              )}
            </button>
          </div>
        </Drawer.Content>
      </Drawer>
    </div>
  );
};

export default MatchingContractors;
