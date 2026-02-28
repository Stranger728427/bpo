import { tenantName } from "@/utils/helpers/helper";

export const DEBOUNCE_TIMEOUT = 500;

export const siteConfig = {
    tenantName: tenantName,
    tenantBaseUrl: '.myai.com',
}

export const TIME_ZONES = [
  { value: 'ET', label: 'Eastern Time (ET)' },
  { value: 'CT', label: 'Central Time (CT)' },
  { value: 'MT', label: 'Mountain Time (MT)' },
  { value: 'PT', label: 'Pacific Time (PT)' },
];