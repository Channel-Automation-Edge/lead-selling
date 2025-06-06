import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BlurFade from '@/components/ui/blur-fade';
import { useLocation } from 'react-router-dom';

interface ConfirmZipProps {
  onNext: () => void;
}

const ConfirmZip: React.FC<ConfirmZipProps> = ({ onNext }) => {
  const { user, setUser } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const validationSchema = Yup.object({
    zip: Yup.string()
      .required('ZIP code is required')
      .matches(/^\d{5}$/, 'ZIP code must be 5 digits')
  });

  const formik = useFormik({
    initialValues: {
      zip: user.zip || params.get('zip') || '',
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      setLoading(true);

      // Save ZIP code to user context
      setUser((prevUser) => ({
        ...prevUser,
        zip: values.zip,
      }));

      setLoading(false);
      onNext(); // Move to next step
    },
  });

  useEffect(() => {
    // Prefill the ZIP code from URL params or user context
    const zipFromParams = params.get('zip');
    if (zipFromParams && !formik.values.zip) {
      formik.setFieldValue('zip', zipFromParams);
    }
  }, [params]);

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <BlurFade delay={0.15} inView yOffset={0}>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              Confirm Your ZIP Code
            </h2>
            <p className="mt-3 text-base text-gray-600 sm:mt-4">
              We'll find qualified professionals who serve your area.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.3} inView yOffset={0}>
          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div className="relative">
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Your ZIP Code
                </label>
                <input
                  id="zip"
                  name="zip"
                  type="text"
                  maxLength={5}
                  autoComplete="postal-code"
                  required
                  className={`block w-full rounded-lg border ${
                    formik.touched.zip && formik.errors.zip 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-accentColor focus:ring-accentColor'
                  } px-4 py-5 text-center text-xl font-medium placeholder-gray-500 shadow-sm`}
                  placeholder="Enter ZIP Code"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zip}
                />
                {formik.touched.zip && formik.errors.zip && (
                  <div className="mt-2 text-center text-sm text-red-600">
                    {formik.errors.zip}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className={`w-full py-5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent ${
                  formik.isValid && formik.values.zip
                    ? 'bg-accentColor text-white hover:bg-accentDark transform transition-transform'
                    : 'bg-gray-200 text-white cursor-not-allowed'
                }`}
                disabled={!formik.isValid || !formik.values.zip}
              >
                {loading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </form>
        </BlurFade>
      </div>
    </div>
  );
};

export default ConfirmZip;
