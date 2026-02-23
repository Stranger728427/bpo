
export type CampaignStatus = 'active' | 'paused' | 'completed';
export type CampaignType = 'onboarding' | 'lead_generation' | 'reminder' | 'survey';

// export enum CampaignType {
//   ONBOARDING = 'onboarding',
//   LEAD_GENERATION = 'lead_generation',
//   REMINDER = 'reminder',
//   SURVEY = 'survey',
// }

export interface Campaigns {
  id: string;
  name: string;
  status: CampaignStatus;
  type: CampaignType;
  start_date: string;
  end_date: string;
  calls_made?: number;
  conversion_rate?: number;
  spend?: number;
  contacts_count?: number;
  ai_assistant_id?: string;
  ai_assistant_name?: string;
  phone_number_id?: string;
  phone_number?: string;
  calling_days?: string[];
  start_time?: string;
  end_time?: string;
  retry_attempts?: number;
  retry_interval?: number;
  time_zone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CampaignDetail extends Campaigns {
  performance: CampaignPerformance;
  call_outcomes: CampaignCallOutcome[];
}

export interface CampaignPerformance {
  calls_made: number;
  calls_made_change: number;
  conversion_rate: number;
  conversion_rate_change: number;
  avg_call_duration: string;
  avg_call_duration_change: number;
  average_cost: number;
  average_cost_change: number;
  performance_over_time: PerformanceDataPoint[];
}

export interface PerformanceDataPoint {
  date: string;
  calls: number;
  conversions: number;
}

export interface CampaignCallOutcome {
  outcome: 'connected' | 'no_answer' | 'busy' | 'failed';
  count: number;
  percentage: number;
}

export interface CampaignListFilters {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface CampaignListResponse {
  data: Campaigns[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CampaignDetailResponse {
  campaign: CampaignDetail;
}

export interface CreateCampaignRequest {
  name: string | null;
  status: CampaignStatus | null;
  type: CampaignType | null;

  start_date: string | null;
  end_date: string | null;

  contacts_count: number | null;

  ai_assistant_id: string | null;
  ai_assistant_name: string | null;

  leads_list_id: string | null;

  phone_number: string | null;

  calling_days: string[] | null;
  start_time: string | null;
  end_time: string | null;

  retry_attempts: number | null;
  retry_interval: number | null;

  time_zone: string | null;
}

export interface CreateCampaignResponse {
  campaign: Campaigns;
  message?: string;
}

export interface UpdateCampaignRequest {
  name?: string;
  type?: CampaignType;
  start_date?: string;
  end_date?: string;
  ai_assistant_id?: string;
  phone_number_id?: string;
  calling_days?: string[];
  start_time?: string;
  end_time?: string;
  retry_attempts?: number;
  retry_interval?: number;
  time_zone?: string;
}

export interface UpdateCampaignResponse {
  campaign: Campaigns;
  message?: string;
}

export interface UpdateCampaignStatusRequest {
  status: CampaignStatus;
}

export interface UpdateCampaignStatusResponse {
  campaign: Campaigns;
  message?: string;
}

export interface DeleteCampaignResponse {
  success: boolean;
  message: string;
}

export interface UploadLeadsRequest {
  campaign_id: string;
  file: File;
}

export interface UploadLeadsResponse {
  success: boolean;
  leads_count: number;
  message?: string;
}

export interface PhoneNumber {
  id: string;
  label: string;
  number: string;
  status: 'active' | 'inactive';
}

export interface PhoneNumbersResponse {
  phone_numbers: PhoneNumber[];
}

export interface AIAssistant {
  id: string;
  name: string;
  model: string;
  model_id: string;
}

export interface AIAssistantsResponse {
  ai_assistants: AIAssistant[];
}

export const getStatusLabel = (status: CampaignStatus): string => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'paused':
      return 'Paused';
    case 'completed':
      return 'Completed';
    default:
      return status;
  }
};

export const getStatusVariant = (status: CampaignStatus): 'success' | 'error' | 'warning' | 'default' => {
  switch (status) {
    case 'active':
      return 'success';
    case 'paused':
      return 'warning';
    case 'completed':
      return 'default';
    default:
      return 'default';
  }
};