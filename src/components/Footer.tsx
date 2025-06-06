import { useAppContext } from '@/context/AppContext';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const { contractor, services } = useAppContext();
  const location = useLocation();
  const currentParams = new URLSearchParams(location.search);

  if ( !contractor || !services) {
    return null; // Handle the case where data is not loaded yet
  }
  // Use dynamic links from contractor
  const privacyPolicyLink = contractor.privacy_policy_link || `#`;
  const termsConditions = contractor.terms_conditions_link || null;

  return (
    <footer className="bg-accentDark">
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center text-white text-sm">
        <div className="flex space-x-4">
          <a
            href={`${privacyPolicyLink}?${currentParams.toString()}`}
            className="hover:underline"
          >
            Privacy Policy
          </a>
          {termsConditions && (
            <a
              href={`${termsConditions}?${currentParams.toString()}`}
              className="hover:underline"
            >
              Terms and Conditions
            </a>
          )}
        </div>
        <div>

          &copy; 2024 {contractor?.name} 
        </div>
      </div>
    </footer>
  );
};

export default Footer;
