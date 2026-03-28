import { BadgeVariant } from "@/components/ui/Badge/Badge";

export interface CallTranscriptItem {
  speaker: 'bot' | 'customer' | string;
  message: string;
}

export const SEARCH_TYPE = {
  NAME: 'name',
  STATUS:'status',
  TYPE:'type',
  PHONE:'number'

} as const;

export type SearchType = (typeof SEARCH_TYPE)[keyof typeof SEARCH_TYPE];

export type CallStatus = 'completed' | 'missed' | 'failed' | 'in_progress' | 'busy' | 'no-answer' | 'completed'| 'voicemail' | 'ivr' | 'canceled' | 'unknown';

export type CallIntent = 'positive' | 'negative' | 'neutral';


export interface Call {
  id: string;
  phone_number: string;
  patient_name: string;
  status: CallStatus;
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
  call_triggered_at?: string | null;
  creation_date: string | null;       // ISO date string expected
  modification_date?: string | null;   // ISO date string expected
}

export type urlParams = {
    page?: number,
    page_size?: number,
    search?: string,
    search_type?: SearchType,

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

export const STATUS_CONFIG: Record<
  CallStatus,
  { label: string; variant: BadgeVariant }
> = {
  completed: { label: 'Completed', variant: 'success' },
  in_progress: { label: 'In Progress', variant: 'info' },
  missed: { label: 'Missed', variant: 'warning' },
  failed: { label: 'Failed', variant: 'error' },
  busy: { label: 'Busy', variant: 'warning' },
  'no-answer': { label: 'No Answer', variant: 'warning' },
  voicemail: { label: 'Voicemail', variant: 'secondary' },
  ivr: { label: 'IVR', variant: 'info' },
  canceled: { label: 'Canceled', variant: 'secondary' },
  unknown: { label: 'Unknown', variant: 'unknown' },
};

export const getStatusVariant = (status?: string): BadgeVariant =>
  STATUS_CONFIG[
    status?.toLowerCase() as CallStatus
  ]?.variant ?? 'unknown';

export const getStatusLabel = (status?: string): string =>
  STATUS_CONFIG[
    status?.toLowerCase() as CallStatus
  ]?.label ?? 'Unknown';