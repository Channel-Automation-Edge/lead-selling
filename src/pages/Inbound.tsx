import { useEffect } from 'react'
import { useAppContext } from '@/context/AppContext';
import Feature from '@/components/Feature';
import FAQ from '@/components/FAQ';
import InboundForm from '@/components/MainForm';
import SocialProof from '@/components/SocialProof';
import TestimonialsGray from '@/components/TestimonialsGray';
import { useLocation } from 'react-router-dom';
import NavBar2 from '@/components/NavBar2';


const Inbound = () => {
  const { form, setForm, contractor } = useAppContext();
  // const [loading, setLoading] = useState(true);

  const useInitialWebhook = () => {
    const location = useLocation();
  
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const userNs = params.get('user_ns');
  
      // Check if webhook has already been sent (using localStorage)
      if (userNs && !localStorage.getItem('webhookSent')) {
        const payload = {
          workspace_id: params.get('company_id'),
          user_ns: userNs,
          market: params.get('market'),
          event: "stl_link_clicked",
          timestamp: new Date().toISOString(),
        };
        // Send to webhook
        fetch('https://hkdk.events/dd4ps4ew70am0n', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        .then(() => {
          // Mark as sent in localStorage
          localStorage.setItem('webhookSent', 'true');
        })
        .catch((error) => console.error('Webhook error:', error));
      }
    }, [location.search]);
  };

  useInitialWebhook();

  const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  // Modified form ID handling
  useEffect(() => {
    const setInitialFormState = async () => {
      let formId = form.formId;

      if (!formId && contractor) {
        const dateTime = new Date().toISOString().replace(/[-:.T]/g, '').slice(0, 14);
        const randomString = generateRandomString(6);
        formId = `${contractor.id}-${dateTime}-${randomString}`;
      }

      setForm(prevForm => ({
        ...prevForm,
        formId: formId || null,
      }));
    };
    setInitialFormState();
  }, [contractor]);

  if (!contractor) {
    return null;
  }

  return (
    <div className='bg-gray-50'>
      <NavBar2 />  
      <div className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12 space-y-12 sm:space-y-20 lg:space-y-24'>
        <InboundForm />
        <SocialProof />
        <TestimonialsGray />
        <Feature />
        <FAQ />
      </div>
    </div>
  )
}

export default Inbound