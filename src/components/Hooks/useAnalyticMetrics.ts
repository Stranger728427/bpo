import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { DailyCallVolume, enableAllMetrics } from '@/service/Types/Analytics';
import { message } from 'antd';
import { AnalyticsService } from '@/service/Analytics.service';

export const useAnalyticMetrics = (campaign_id?: string) => {
  const analyticsService = AnalyticsService();
  const requestMetrics = useMutation({
    mutationFn: analyticsService.requestMetrics,
    onSuccess: () => {
      message.success('Metrics Received');
    },
    onError: () => {
      message.error('Metrics Failed to receive');
    },
  });

  useEffect(() => {
    // Always call, but pass campaign_id only if available
    requestMetrics.mutateAsync({
      ...(campaign_id ? { campaign_id } : {}),
      metrics: enableAllMetrics(),
    });
  }, [campaign_id]);

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

console.log('metric:', metric);

  return {
    ...requestMetrics,
    callVolumeData,
    bestPerformingCampaign,
    worstPerformingCampaign,
    totalCallsMade,
    overAllConversion,
    totalActiveCampaign,
    totalLeadsReached
  };
};
