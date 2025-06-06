import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '@/context/AppContext';
import PhoneInput from 'react-phone-number-input/input';
import NavButtons from '../ui/navButtons';

interface UserInfoProps {
  onNext: () => void;
  onReset: () => void;
  onBack: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ onNext, onReset, onBack }) => {
  
  const { user, form, setUser, setForm, contractor } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  // Use dynamic links from contractor
  const privacyPolicyLink = contractor.privacy_policy_link || `#`;
  const termsConditions = contractor.terms_conditions_link || null;

  const handleReset = () => {
    onReset();
  };

  const handleBack = () => {
    onBack();
  };

  const capitalizeWords = (str: string | null) => {
    if (!str) return '';
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialPhone = user.phone || params.get('phone');
    const numericPhone = initialPhone ? initialPhone.replace(/\D/g, '') : '';
    formik.setValues({
      firstname: user.firstname || capitalizeWords(params.get('firstname')) || '',
      lastname: user.lastname || capitalizeWords(params.get('lastname')) || '',
      zip: user.zip || params.get('zip') || '', // Default to user.zip
      state: user.state || params.get('state') || '', // Default to URL parameter state or empty
      address1: user.address1 || capitalizeWords(params.get('address1')) || '',
      address2: user.address2 || capitalizeWords(params.get('address2')) || '',
      city: user.city || capitalizeWords(params.get('city')) || '',
      email: user.email || params.get('email') || '',
      phone: initialPhone ? `+1${numericPhone}` : '',
      termsAndPrivacyOptIn: form.termsAndPrivacyOptIn || false,
    });
    formik.setFieldTouched('termsAndPrivacyOptIn', true, true);
  }, [user, form.termsAndPrivacyOptIn]);

  const validationSchema = Yup.object({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    zip: Yup.string().required('Zip code is required'),
    state: Yup.string().required('State is required').max(2, 'State code must be 2 characters'),
    address1: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
      .matches(/^\+1\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    termsAndPrivacyOptIn: Yup.boolean().oneOf([true], 'You must opt-in to continue'),
  });

  const formik = useFormik({
    initialValues: {
      zip: '',
      state: '',
      address1: '',
      address2: '',
      city: '',
      email: '',
      phone: '',
      firstname: '',
      lastname: '',
      termsAndPrivacyOptIn: false,
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      console.log('submitting');
      const rawPhone = values.phone.startsWith('+1') ? values.phone.slice(2) : values.phone;
      setLoading(true);

      setUser((prevUser) => ({
        ...prevUser,
        zip: values.zip,
        state: values.state,
        email: values.email,
        phone: rawPhone,
        firstname: capitalizeWords(values.firstname),
        lastname: capitalizeWords(values.lastname),
        address1: capitalizeWords(values.address1),
        address2: capitalizeWords(values.address2),
        city: capitalizeWords(values.city), 
      }));

      setForm((prevForm) => ({
        ...prevForm,
        termsAndPrivacyOptIn: values.termsAndPrivacyOptIn,
      }));

      setLoading(false);
      onNext();
    },
  });

  useEffect(() => {
    // Trigger validation on initial mount and when form values change
    const validateFields = async () => {
      await formik.validateForm();  // Trigger validation
    };
  
    validateFields();
  }, [formik.values]); // Run effect on form values change

  // 
  // 

  return (
    <div className="container-form">
      <NavButtons handleBack={handleBack} handleReset={handleReset} />
      
      <div className="max-w-xl mx-auto">
        <div className='flex justify-center text-center mb-8'>
          <div className="max-w-[40rem] text-center">
            <h1 className="heading-form">
            Great! Let's <span className="text-accentColor">confirm </span> your contact details
            </h1>
          </div>
        </div>
        <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
          <div className="mt-2">
            <form onSubmit={formik.handleSubmit} className="grid gap-4 lg:gap-6 plausible-event-name=form_step_complete plausible-event-form_step=3_info">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div className="relative">
                  <label htmlFor="firstname" className="input-label">First Name</label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                    onBlur={formik.handleBlur}
                    className="input-field"
                  />
                  {formik.errors.firstname ? (
                    <img
                      src="/images/warning.svg"
                      alt="Invalid"
                      className="absolute right-3 top-10 w-6"
                    />
                  ) : (
                    <img
                      src="/images/tick.svg"
                      alt="Valid"
                      className="absolute right-6 top-11 w-4"
                    />
                  )}
                  {formik.touched.firstname && formik.errors.firstname && (
                    <div className="error text-sm text-red-500">{formik.errors.firstname}</div>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="lastname" className="input-label">Last Name</label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                    onBlur={formik.handleBlur}
                    className="input-field"
                  />
                  {formik.errors.lastname ? (
                    <img
                      src="/images/warning.svg"
                      alt="Invalid"
                      className="absolute right-3 top-10 w-6"
                    />
                  ) : (
                    <img
                      src="/images/tick.svg"
                      alt="Valid"
                      className="absolute right-6 top-11 w-4"
                    />
                  )}
                  {formik.touched.lastname && formik.errors.lastname && (
                    <div className="error text-sm text-red-500">{formik.errors.lastname}</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div className="relative">
                  <label htmlFor="email" className="input-label">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    className="input-field"
                  />
                  {formik.errors.email ? (
                    <img
                      src="/images/warning.svg"
                      alt="Invalid"
                      className="absolute right-3 top-10 w-6"
                    />
                  ) : (
                    <img
                      src="/images/tick.svg"
                      alt="Valid"
                      className="absolute right-6 top-11 w-4"
                    />
                  )}
                  {formik.touched.email && formik.errors.email && (
                    <div className="error text-sm text-red-500">{formik.errors.email}</div>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="phone" className="input-label">Phone</label>
                  <div className='flex items-start'>
                    <input className="py-3 px-4 block text-center w-14 bg-gray-100 border border-gray-200 border-r-transparent rounded-l-lg text-base focus:border-gray-200 focus:border-r-transparent focus:ring-transparent cursor-default focus:outline-none" readOnly placeholder='+1'>
                    </input>
                    <PhoneInput
                      country="US"
                      id="phone"
                      name="phone"
                      maxLength={15}
                      value={formik.values.phone}
                      onChange={value => formik.setFieldValue('phone', value || '')}
                      onBlur={formik.handleBlur}
                      className="py-3 px-4 block w-full border border-gray-200 rounded-r-lg text-base focus:outline-none focus:ring-1 focus:border-accentColor
                      focus:ring-accentColor"
                    />
                  </div>
                  
                  {formik.errors.phone ? (
                    <img
                      src="/images/warning.svg"
                      alt="Invalid"
                      className="absolute right-3 top-10 w-6"
                    />
                  ) : (
                    <img
                      src="/images/tick.svg"
                      alt="Valid"
                      className="absolute right-6 top-11 w-4"
                    />
                  )}
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="error text-sm text-red-500">{formik.errors.phone}</div>
                  )}
                </div>
              </div>

              <div className="relative">
                <label htmlFor="address1" className="input-label">Address Line 1</label>
                <input
                  id="address1"
                  name="address1"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.address1}
                  onBlur={formik.handleBlur}
                  className="input-field"
                />
                {formik.errors.address1 ? (
                  <img
                    src="/images/warning.svg"
                    alt="Invalid"
                    className="absolute right-3 top-10 w-6"
                  />
                ) : (
                  <img
                    src="/images/tick.svg"
                    alt="Valid"
                    className="absolute right-6 top-11 w-4"
                  />
                )}
                {formik.touched.address1 && formik.errors.address1 && (
                  <div className="error text-sm text-red-500">{formik.errors.address1}</div>
                )}
              </div>
              
              <div className="relative">
                <label htmlFor="address2" className="input-label">Address Line 2</label>
                <input
                  id="address2"
                  name="address2"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.address2}
                  onBlur={formik.handleBlur}
                  className="input-field"
                />
                {formik.values.address2 && !formik.errors.address2 && (
                  <img
                    src="/images/tick.svg"
                    alt="Valid"
                    className="absolute right-6 top-11 w-4"
                  />
                )}
                {formik.touched.address2 && formik.errors.address2 && (
                  <div className="error text-sm text-red-500">{formik.errors.address2}</div>
                )}
              </div>

              <div className="relative">
                <label htmlFor="city" className="input-label">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  onBlur={formik.handleBlur}
                  className="input-field"
                />
                {formik.errors.city ? (
                  <img
                    src="/images/warning.svg"
                    alt="Invalid"
                    className="absolute right-3 top-10 w-6"
                  />
                ) : (
                  <img
                    src="/images/tick.svg"
                    alt="Valid"
                    className="absolute right-6 top-11 w-4"
                  />
                )}
                {formik.touched.city && formik.errors.city && (
                  <div className="error text-sm text-red-500">{formik.errors.city}</div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                <div className="relative">
                  <label htmlFor="state" className="input-label">State</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    maxLength={2}
                    onChange={formik.handleChange}
                    value={formik.values.state}
                    onBlur={formik.handleBlur}
                    className="input-field"
                  />
                  {formik.errors.state ? (
                    <img src="/images/warning.svg" alt="Invalid" className="absolute right-3 top-10 w-6" />
                  ) : (
                    <img src="/images/tick.svg" alt="Valid" className="absolute right-6 top-11 w-4" />
                  )}
                  {formik.touched.state && formik.errors.state && (
                    <div className="error text-sm text-red-500">{formik.errors.state}</div>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="zip" className="input-label">ZIP Code</label>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.zip}
                    onBlur={formik.handleBlur}
                    maxLength={5}
                    className="input-field"
                  />
                  {formik.errors.zip ? (
                    <img
                      src="/images/warning.svg"
                      alt="Invalid"
                      className="absolute right-3 top-10 w-6"
                    />
                  ) : (
                    <img
                      src="/images/tick.svg"
                      alt="Valid"
                      className="absolute right-6 top-11 w-4"
                    />
                  )}
                  {formik.touched.zip && formik.errors.zip && (
                    <div className="error text-sm text-red-500">{formik.errors.zip}</div>
                  )}
                </div>
              </div>

              <div className="flex items-start mt-4">
                <input
                  id="termsAndPrivacyOptIn"
                  name="termsAndPrivacyOptIn"
                  type="checkbox"
                  onChange={formik.handleChange}
                  checked={formik.values.termsAndPrivacyOptIn}
                  className="h-6 w-6 text-accentColor border-gray-300 rounded focus:ring-accentColor bg-white"
                />
                <label htmlFor="termsAndPrivacyOptIn" className="ml-4 block text-base text-gray-900 dark:text-gray-300">
                  I have read and agree to the 
                  <a href={`${privacyPolicyLink}`} target="_blank" rel="noopener noreferrer" className="text-accentColor underline ml-1">
                    Privacy Policy
                  </a>
                  {termsConditions && ( 
                    <span> and
                      <a href={`${termsConditions}`} target="_blank" rel="noopener noreferrer" className="text-accentColor underline ml-1">
                      Terms and Conditions
                      </a>
                    </span>
                  )}
                </label>
              </div>
              {formik.errors.termsAndPrivacyOptIn && (
                <div className="text-sm text-red-500">
                  {formik.errors.termsAndPrivacyOptIn}
                </div>
              )}

              <div className="mt-4 grid sticky bottom-4">
                <button
                  type="submit"
                  className={`w-full py-5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent  ${
                    formik.isValid && formik.values.termsAndPrivacyOptIn
                      ? 'bg-accentColor text-white hover:bg-accentDark transform transition-transform'
                      : 'bg-gray-200 text-white cursor-not-allowed'
                  }`}
                  disabled={!formik.isValid || !formik.values.termsAndPrivacyOptIn}
                  >
                  {loading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    'Confirm Information'
                  )}
                </button>
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm text-gray-500 dark:text-neutral-500">
                  {/* Additional information or disclaimer can go here */}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
