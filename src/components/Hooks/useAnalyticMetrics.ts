import { useQuery } from '@tanstack/react-query';
import {
  DailyCallVolume,
  enableCampaignMetrics,
  enableDashboardMetrics,
} from '@/service/Types/Analytics';
import { AnalyticsService } from '@/service/Analytics.service';
import { queryKeys } from '@/lib/query/queryKeys';

export const useAnalyticMetrics = (campaignId?: string) => {
  const analyticsService = AnalyticsService();

  const requestMetrics = useQuery({
    queryKey: campaignId
      ? queryKeys.campaignAnalytics.campaignMetrics(campaignId)
      : queryKeys.analytics.dashboardMetrics(),
    queryFn: () =>
      analyticsService.requestMetrics({
        ...(campaignId ? { campaign_id: campaignId } : {}),
        metrics: campaignId
          ? enableCampaignMetrics()
          : enableDashboardMetrics(),
      }),
  });

  const metric = requestMetrics?.data;

  const callVolumeData =
    metric?.daily_call_volume?.map((item: DailyCallVolume) => ({
      label: item.date,
      value: item.count,
    })) ?? [];

  const bestPerformingCampaign = metric?.best_performing_campaign ?? [];
  const worstPerformingCampaign = metric?.worst_performing_campaign ?? [];

  const totalCallsMade = metric?.total_calls_made ?? 0;
  const overAllConversion = metric?.overall_conversion_rate ?? 0;
  const totalActiveCampaign = metric?.total_active_campaigns ?? 0;
  const totalLeadsReached = metric?.total_leads_reached ?? 0;

  // Campaign Metrics
  const callsMade = metric?.calls_made;
  const conversionRate = metric?.conversion_rate;
  const avgCallDuration = metric?.campaign_avg_call_duration;
  const campaignProgrss = metric?.campaign_progress;
  const leadStatusDistribution = metric?.lead_status_distribution;
  const CallStatusBreakDown = metric?.call_status_breakdown;

  return {
    requestMetrics,
    callVolumeData,
    bestPerformingCampaign,
    worstPerformingCampaign,
    totalCallsMade,
    overAllConversion,
    totalActiveCampaign,
    totalLeadsReached,
    callsMade,
    conversionRate,
    avgCallDuration,
    campaignProgrss,
    leadStatusDistribution,
    CallStatusBreakDown,
  };
};
