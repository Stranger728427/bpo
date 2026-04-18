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
  // PART A - OVERALL DASHBOARD
  "Total Calls Made": number;
  "Overall Conversion Rate": number;
  "Total Active Campaigns": number;
  "Total Leads Reached": number;

  "Daily Call Volume": DailyCallVolume[];
  "Best Performing Campaign": CampaignPerformance[];
  "Worst Performing Campaign": CampaignPerformance[];

  // PART B - CAMPAIGN DETAIL
  "Calls Made": number;
  "Conversion Rate": number;
  "Avg Call Duration": string;

  "Campaign Progress": CampaignProgress;

  "Lead Status Distribution": LeadStatus[];
  "Call Status Breakdown": CallStatus[];
}