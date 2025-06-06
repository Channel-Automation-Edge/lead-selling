"use client";
import Footer from "@/components/Footer";
import NavBar2 from "@/components/NavBar2";
import { useAppContext } from '@/context/AppContext';

// Import your CSS file


const CookiePolicy = () => {

  const {contractor} = useAppContext();
  
  return (
    <div className="bg-gray-100">
      <NavBar2 />
      <div className="z-10 max-w-[85rem] px-4 lg:px-14 mx-auto relative pb-20 mb-20 bg-white">
        <div className="max-w-full mx-auto">
          <div className='flex justify-center text-center'>
            <div className="my-10">
              <h1 className="heading-primary">
                Cookie Policy for <span className="text-accentColor">{contractor.name}</span>
              </h1>
            </div>
          </div>
        </div>
        <h3 className="heading-secondary">What are Cookies?</h3>
        <p className="paragraph">Cookies are small text files that websites place on your computer or mobile device to store information about your browsing activity. They help websites remember your preferences, provide personalized experiences, and gather information about how the site is used.</p>
        
        <h3 className="heading-secondary">Cookies We Use</h3>
        <p className="paragraph">We use the following types of cookies:</p>
        <h4 className="list-label">Analytics Cookies (PostHog):</h4>
        <p className="paragraph">We use PostHog, a third-party analytics service, to collect information about how visitors use our website. This helps us understand user behavior, improve our website's performance, and tailor content to better meet the needs of our audience. PostHog sets the following cookies:</p>
        <ul className="list-decimal list-inside ml-2 mt-4">
          <li className="list-label">ph_s[random characters]_posthog:
            <dl className="list-description">This is a persistent cookie that uniquely identifies a user for analytical purposes. It allows PostHog to track user behavior across multiple sessions. This cookie expires in approximately one year. The data collected includes a unique user identifier (distinct_id) and session information ($sesid). While this cookie has a long duration, the session data it contains (e.g., timestamps) is updated on each new session, effectively making it function partly as a session cookie as well.</dl>
          </li>
          <li className="list-label">ph_phc_[random characters]_posthog:
            <dl className="list-description">This persistent cookie also uniquely identifies users and stores additional information about their initial visit, such as the referring website (the site the user came from) and the specific page they landed on. This cookie also expires in approximately one year. The data collected includes a unique user identifier (distinct_id), session information ($sesid), and initial referrer and landing page URLs ($initial_person_info). This information may include query parameters in the URL that could potentially contain personally identifiable information (PII), such as names, location data, or other details provided in the URL.</dl>
          </li>
        </ul>

        <h3 className="heading-secondary">Purpose of Data Collection:</h3>
        <p className="paragraph">The data collected by PostHog cookies is used to:</p>
        <ul className="list-disc list-inside ml-2 mt-2">
          <li>Analyze website traffic and usage patterns</li>
          <li>Identify trends in user behavior</li>
          <li>Improve the performance and usability of our website</li>
          <li>Personalize content and user experiences</li> 
          <li>Measure the effectiveness of marketing campaigns</li> 
        </ul>
        
        <h3 className="heading-secondary">Your Choices:</h3>
        <ul className="list-label list-inside mt-4">
          <li className="list-label">Cookie Consent:
            <dl className="list-description">We will implement a cookie consent mechanism that allows you to choose whether or not to accept these analytics cookies. You will have the option to accept or reject non-essential cookies.</dl>
          </li>
          <li className="list-label">Opt-Out of PostHog:
            <dl className="list-description">You can opt-out of PostHog tracking by blocking cookies. Note however, that we are tracking for how the website is used, such as, which buttons were clicked to better understand user preferences. If you block cookies, we won't be able to improve our website for user experience.</dl>
          </li>
          <li className="list-label">Browser Settings:
            <dl className="list-description">You can manage cookies through your web browser settings. Most browsers allow you to block all cookies, block only third-party cookies, or delete existing cookies. However, please note that blocking or deleting cookies may affect the functionality of our website and other websites you visit. Instructions for managing cookies in common browsers can be found here: 
            </dl>
            <ul className="list-disc list-inside ml-2 mt-2 text-sm">
              <li><a href="https://support.google.com/chrome/answer/95647?hl=en&co=GENIE.Platform%3DDesktop">https://support.google.com/chrome/answer/95647?hl=en&co=GENIE.Platform%3DDesktop</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox">https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac">https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac</a></li>
            </ul>
          </li>
        </ul>
        <h3 className="heading-secondary">Changes to this Cookie Policy:</h3>
        <p className="paragraph">We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We encourage you to review this policy periodically for any updates.</p>
        <h3 className="heading-secondary">Contact Us:</h3>
        <p className="paragraph">If you have any questions about this Cookie Policy, please contact us at hello@homeprojectpartners.com</p>
      </div>
      <Footer />
    </div>
  );
}

export default CookiePolicy;
