export enum MetricKey {
  TOTAL_CALLS_MADE = "Total Calls Made",
  TOTAL_ACTIVE_CAMPAIGNS = "Total Active Campaigns",
  OVERALL_CONVERSION_RATE = "Overall Conversion Rate",
  TOTAL_LEADS_REACHED = "Total Leads Reached",
  DAILY_CALL_VOLUME = "Daily Call Volume",
  BEST_PERFORMING_CAMPAIGN = "Best Performing Campaign",
  WORST_PERFORMING_CAMPAIGN = "Worst Performing Campaign",
  CALLS_MADE = "Calls Made",
  CONVERSION_RATE = "Conversion Rate",
  AVG_CALL_DURATION = "Avg Call Duration",
  CAMPAIGN_PROGRESS = "Campaign Progress",
  LEAD_STATUS_DISTRIBUTION = "Lead Status Distribution",
  CALL_STATUS_BREAKDOWN = "Call Status Breakdown",
}

// Metrics object
export type Metrics = Partial<Record<MetricKey, boolean>>;

export interface CampaignMetricsRequest {
  campaign_id?: string;
  metrics: Metrics;
}

export const enableAllMetrics = (): Metrics => {
  return Object.values(MetricKey).reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {} as Metrics);
};



export interface DailyCallVolume {
  date: string;
  count: number;
}

export interface CampaignPerformance {
  campaign_name: string;
  call_count: number;
  converted_calls: number;
  conversion_rate: number;
}

export interface CampaignProgress {
  expected_calls: number;
  actual_calls: number;
  progress_percentage: number;
}

export interface LeadStatus {
  label: string;
  count: number;
}

export interface CallStatus {
  label: string;
  count: number;
}

export interface AnalyticsResponse {
  // OVERALL DASHBOARD
  total_calls_made: number;
  total_active_campaigns: number;
  overall_conversion_rate: number;
  total_leads_reached: number;

  daily_call_volume: DailyCallVolume[];
  best_performing_campaign: CampaignPerformance[];
  worst_performing_campaign: CampaignPerformance[];

  // CAMPAIGN DETAIL
  calls_made: number;
  conversion_rate: number;
  campaign_avg_call_duration: string;

  campaign_progress: CampaignProgress | null;

  lead_status_distribution: LeadStatus[];
  call_status_breakdown: CallStatus[];
}