import { useAppContext } from '@/context/AppContext';
import {central} from '@/lib/supabaseClient';

const useResetDatabase = () => {

  const resetFormFields = async () => {

    try {
      const { form } = useAppContext();

      // Check if formId exists in the database
      const { data, error } = await central
        .from('Forms')
        .select('id')
        .eq('id', form.formId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking formId:', error);
        return;
      }

      if (data) {
        // formId exists, clear specific fields
        const { error: updateError } = await central
          .from('Forms')
          .update({
            optIn_completion: false,
            appointment_completion: false,
            email_optIn: false,
            termsAndPrivacy_optIn: false,
            smsAndCall_optIn: false,
          })
          .eq('id', form.formId);

        if (updateError) {
          console.error('Error clearing form fields:', updateError);
          return;
        }
      }
    } catch (err) {
      console.error('Unexpected error during reset:', err);
    }
  };

  return resetFormFields;
};

export default useResetDatabase;
