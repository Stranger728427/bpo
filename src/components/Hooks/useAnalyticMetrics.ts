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

  const requestDashboardMetrics = useQuery({
    queryKey: queryKeys.analytics.dashboardMetrics(),
    queryFn: () =>
      analyticsService.requestMetrics({
        metrics: enableDashboardMetrics(),
      }),
  });

   const requestCampaignMetrics = useQuery({
    queryKey:  queryKeys.campaignAnalytics.campaignMetrics(campaignId!),
    queryFn: () =>
      analyticsService.requestMetrics({
        metrics: enableCampaignMetrics()
    }),
  });

  const dashboardMetrics = requestDashboardMetrics?.data;
  const campaignMetrics = requestCampaignMetrics?.data;


  // Dashboard Metrics
  const callVolumeData =
    dashboardMetrics?.daily_call_volume?.map((item: DailyCallVolume) => ({
      label: item.date,
      value: item.count,
    })) ?? [];

  const bestPerformingCampaign = dashboardMetrics?.best_performing_campaign ?? [];
  const worstPerformingCampaign = dashboardMetrics?.worst_performing_campaign ?? [];

  const totalCallsMade = dashboardMetrics?.total_calls_made ?? 0;
  const overAllConversion = dashboardMetrics?.overall_conversion_rate ?? 0;
  const totalActiveCampaign = dashboardMetrics?.total_active_campaigns ?? 0;
  const totalLeadsReached = dashboardMetrics?.total_leads_reached ?? 0;

  // Campaign Metrics
  const callsMade = campaignMetrics?.calls_made;
  const conversionRate = campaignMetrics?.conversion_rate;
  const avgCallDuration = campaignMetrics?.campaign_avg_call_duration;
  const campaignProgrss = campaignMetrics?.campaign_progress;
  const leadStatusDistribution = campaignMetrics?.lead_status_distribution;
  const CallStatusBreakDown = campaignMetrics?.call_status_breakdown;

  return {
    dashboardMetrics,
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
