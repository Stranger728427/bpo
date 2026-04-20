export enum MetricKey {
  TOTAL_CALLS_MADE = "total_calls_made",
  TOTAL_ACTIVE_CAMPAIGNS = "total_active_campaigns",
  OVERALL_CONVERSION_RATE = "overall_conversion_rate",
  TOTAL_LEADS_REACHED = "total_leads_reached",

  DAILY_CALL_VOLUME = "daily_call_volume",
  BEST_PERFORMING_CAMPAIGN = "best_performing_campaign",
  WORST_PERFORMING_CAMPAIGN = "worst_performing_campaign",

  CALLS_MADE = "calls_made",
  CONVERSION_RATE = "conversion_rate",
  AVG_CALL_DURATION = "campaign_avg_call_duration",

  CAMPAIGN_PROGRESS = "campaign_progress",
  LEAD_STATUS_DISTRIBUTION = "lead_status_distribution",
  CALL_STATUS_BREAKDOWN = "call_status_breakdown",
}

const DASHBOARD_METRICS: MetricKey[] = [
  MetricKey.TOTAL_CALLS_MADE,
  MetricKey.TOTAL_ACTIVE_CAMPAIGNS,
  MetricKey.OVERALL_CONVERSION_RATE,
  MetricKey.TOTAL_LEADS_REACHED,
  MetricKey.DAILY_CALL_VOLUME,
  MetricKey.BEST_PERFORMING_CAMPAIGN,
  MetricKey.WORST_PERFORMING_CAMPAIGN,
];

const CAMPAIGN_METRICS: MetricKey[] = [
  MetricKey.CALLS_MADE,
  MetricKey.CONVERSION_RATE,
  MetricKey.AVG_CALL_DURATION,
  MetricKey.CAMPAIGN_PROGRESS,
  MetricKey.LEAD_STATUS_DISTRIBUTION,
  MetricKey.CALL_STATUS_BREAKDOWN,
];

export type Metrics = Partial<Record<MetricKey, boolean>>;
export interface CampaignMetricsRequest {
  campaign_id?: string;
  metrics: Metrics;
}

export const enableDashboardMetrics = (): Metrics => {
  return DASHBOARD_METRICS.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {} as Metrics);
};

export const enableCampaignMetrics = (): Metrics => {
  return CAMPAIGN_METRICS.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {} as Metrics);
};

// export const enableAllMetrics = (): Metrics => {
//   return [...DASHBOARD_METRICS, ...CAMPAIGN_METRICS].reduce(
//     (acc, key) => {
//       acc[key] = true;
//       return acc;
//     },
//     {} as Metrics
//   );
// };

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
