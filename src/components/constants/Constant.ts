import { tenantName } from "@/utils/helpers/helper";

// /openai
export const LLM_TYPE = 'gemini'

export const DEBOUNCE_TIMEOUT = 500;

export const siteConfig = {
    tenantName: tenantName,
    tenantBaseUrl: '.myai.com',
}

export const TIME_ZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Phoenix', label: 'Mountain Time - Arizona' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' }
];