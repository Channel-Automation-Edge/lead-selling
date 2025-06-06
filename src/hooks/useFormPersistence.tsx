import { useState, useEffect } from 'react';

function useFormPersistence<T>(formKey: string, initialData: T) {
  // Initialize formData with saved data from localStorage or initialData
  const [formData, setFormData] = useState<T>(() => {
    const savedData = localStorage.getItem(formKey);
    return savedData ? JSON.parse(savedData) : initialData;
  });

  // Update localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(formKey, JSON.stringify(formData));
  }, [formData, formKey]);

  // Reset formData to initialData and clear localStorage entry
  const resetFormData = () => {
    setFormData(initialData);
    localStorage.removeItem(formKey);
  };

  return [formData, setFormData, resetFormData] as const;
}

export default useFormPersistence;
