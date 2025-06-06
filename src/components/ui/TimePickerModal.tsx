import React, { useState } from 'react';

interface TimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (time: string) => void;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({ isOpen, onClose, onSave }) => {
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  const handleSave = () => {
    onSave(selectedTime);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-bold text-gray-900">Select Time</h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          <input
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:border-accentColor focus:ring-accentColor"
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="py-2 px-4 bg-accentColor text-white rounded-lg hover:bg-accentColor-dark"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerModal;