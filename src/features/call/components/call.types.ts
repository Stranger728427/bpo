export interface CallTranscriptItem {
  speaker: 'bot' | 'customer' | string;
  message: string;
}

export const SEARCH_TYPE = {
  NAME: 'name',
  PHONE: 'number',
} as const;

export type SearchType = (typeof SEARCH_TYPE)[keyof typeof SEARCH_TYPE];

export type CallStatus = 'completed' | 'missed' | 'failed' | 'in_progress' | 'unknown' | 'completed';

export type CallIntent = 'positive' | 'negative' | 'neutral';


export interface Call {
  id: string;
  phone_number: string;
  patient_name: string;
  status: string;
  call_duration: string; // kept as string since API returns "46"
  summary?: string;
  intent: string;
  overall_rating?: number;
  confidence?: number;
  transcript?: CallTranscriptItem[];
  audio_url?: string | null;
  campaign_id?: number | null;
  campaign_name?: string | null;
  cost?: number | null;
  creation_date: string | null;       // ISO date string expected
  modification_date?: string | null;   // ISO date string expected
}

export type urlParams = {
    page?: number,
    page_size?: number,
}

export interface CallResponse {
  data: Call[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface TriggerCall {
  id: number;
  phone_number: string;
  patient_name: string;
  appointment_date: string;
  appointment_time: string;
  created_at: string;
  status: CallStatus;
}

export interface TriggerCallResponse {
  data: TriggerCall[]
}

export const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'missed':
        return 'warning';
      case 'failed':
        return 'error';
      case 'in_progress':
        return 'info';
      default:
        return 'unknown';
    }
  };

export const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'missed':
        return 'Missed';
      case 'failed':
        return 'Failed';
      case 'in_progress':
        return 'In Progress';
      default:
        return 'Unknown';
    }
  };




