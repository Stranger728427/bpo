import z from "zod";
import { campaignSchema } from "../schema/Campaign.schema";

export type CampaignStatus = 'active' | 'paused' | 'completed';
export type CampaignType = 'onboarding' | 'lead_generation' | 'reminder' | 'survey';

export const CAMPAIGN_FILTERS = {
  NAME:'name',
  STATUS:'status',
  TYPE:'type',
} as const;

export type CAMPAIGN_FILTERS = (typeof CAMPAIGN_FILTERS)[keyof typeof CAMPAIGN_FILTERS];


export interface Campaigns {
  id: string | null;
  name: string;
  status: CampaignStatus;
  type: CampaignType;
  start_date: string;
  end_date: string;
  conversion_rate?: number;
  spend?: number;
  contacts_count?: number;
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
  name?: string;
  status?: string;
  type?: string;
  page?: number;
  page_size?: number;
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
  campaignId?:string | null;
  name: string | null;
  type: CampaignType | null;
  start_date: string | null;
  end_date: string | null;
  calling_days: string[] | null;
  start_time: string | null;
  end_time: string | null;
  time_zone: string | null;
}
export interface UploadLeadsRequest {
  campaign_id: string;
  file: File;
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

export const step1Fields = ["name", "type", "start_date", "end_date"];
export const step2Fields = ["calling_days", "start_time", "end_time", "time_zone"];
export const step3Fields = []; // Review step has no unique fields to validate

export type CampaignFormValues = z.infer<typeof campaignSchema>;