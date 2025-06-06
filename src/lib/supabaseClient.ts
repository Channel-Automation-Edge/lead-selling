import { createClient } from '@supabase/supabase-js';

const centralUrl = import.meta.env.VITE_CENTRAL_URL;
const centralKey = import.meta.env.VITE_CENTRAL_KEY;
const central = createClient(centralUrl, centralKey)

const companyUrl = import.meta.env.VITE_COMPANY_URL;
const companyKey = import.meta.env.VITE_COMPANY_KEY;
const company = createClient(companyUrl, companyKey)

export { central, company };