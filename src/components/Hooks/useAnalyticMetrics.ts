import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  DailyCallVolume,
  enableCampaignMetrics,
  enableDashboardMetrics,
} from '@/service/Types/Analytics';
import { message } from 'antd';
import { AnalyticsService } from '@/service/Analytics.service';

export const useAnalyticMetrics = (campaignId?: string) => {
  const analyticsService = AnalyticsService();
  const requestMetrics = useMutation({
    mutationFn: analyticsService.requestMetrics,
    onSuccess: () => {
  const successMessage = campaignId
    ? 'Track Campaign insights.'
    : 'Track Overall Performance insights.';

  message.success(successMessage);
},
onError: () => {
  const errorMessage = campaignId
    ? 'Failed to load campaign insights. Please try again.'
    : 'Failed to load performance insights. Please try again.';

  message.error(errorMessage);
},
  });

  useEffect(() => {
    // Always call, but pass campaign_id only if available
    requestMetrics.mutateAsync({
      ...(campaignId ? { campaignId } : {}),
      metrics: campaignId ? enableCampaignMetrics() : enableDashboardMetrics(),
    });
  }, [campaignId]);

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
