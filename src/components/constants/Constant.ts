import { tenantName } from "@/utils/helpers/helper";

// /openai
export const LLM_TYPE = 'gemini'

export const DEBOUNCE_TIMEOUT = 500;

export const getSiteConfig = () => ({
    tenantName,
    tenantBaseUrl: '.myai.com',
});

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

export const COLORS = {
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  fallBack: 'var(--color-fallback)',
};

export const DATE_FORMAT = {
	USA_DATE: 'MM/DD/YYYY',
	USA_DATE_TIME: 'MM/DD/YYYY hh:mm A',
	USA_DATE_TIME_WITH_SEPARATOR: 'MM/DD/YYYY | hh:mm A',
	ISO_DATE_TIME: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
	ISO_DATE_TIME_WITHOUT_MILLISECONDS: 'YYYY-MM-DDTHH:mm:ss',
	ISO_DATE: 'YYYY-MM-DD',
	USA_TIME: 'hh:mm A',
	USA_24_HR_TIME: 'HH:mm:ss',
	'DDD, HH/MM': 'ddd, DD/MM',
	HH_MM: 'HH:mm',
	AbbreviatedMonthDayYear: 'MMMM D, YYYY',
	YYYYMMDD: 'YYYYMMDD',
	MM_DD: 'MM/DD',
	DATE_FORMAT_DAY_MM_DD: 'ddd, MM/DD',
	MMDDYY: 'MM/DD/YY',
	AbbreviatedDayMonthYear: 'DD MMM YYYY, hh:mm A'
};

export const timeFormat = {
	HOUR_MINUTE: 'HH:mm',
	HOUR_MINUTE_SECOND: 'HH:mm:ss',
	MINUTE: 'minute',
	HOUR_MINUTE_12: 'hh:mm A',
};

