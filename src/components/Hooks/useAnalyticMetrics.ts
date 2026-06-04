import { useQuery } from '@tanstack/react-query';
import {
  AnalyticsResponse,
  DailyCallVolume,
  enableCampaignMetrics,
  enableDashboardMetrics,
} from '@/service/Types/Analytics';
import { AnalyticsService } from '@/service/Analytics.service';
import { queryKeys } from '@/lib/query/queryKeys';
import { useState } from 'react';
import useDateUtils from './useDateUtils';
import { DATE_FORMAT } from '../constants/Constant';

export const useAnalyticMetrics = (campaignId?: string) => {
  

  const [dateFilter, setDateFilter] = useState('last_7_days');
  const { getLocal } = useDateUtils();
  const analyticsService = AnalyticsService();

  const requestDashboardMetrics = useQuery<AnalyticsResponse>({
    queryKey: queryKeys.analytics.dashboardMetrics(dateFilter),
    queryFn: ({ signal }) =>
      analyticsService.requestMetrics(
        {
          metrics: enableDashboardMetrics(),
          filter_type: dateFilter,
        },
        signal
      ),
  });

  const requestCampaignMetrics = useQuery<AnalyticsResponse>({
    queryKey: queryKeys.campaignAnalytics.campaignMetrics(campaignId!),
    queryFn: ({ signal }) =>
      analyticsService.requestMetrics(
        {
          campaign_id:campaignId,
          metrics: enableCampaignMetrics(),
        },
        signal
      ),

    enabled: !!campaignId,
  });

  const dashboardMetrics = requestDashboardMetrics?.data;
  const campaignMetrics = requestCampaignMetrics?.data;

  // Dashboard Metrics
  const callVolumeData =
    dashboardMetrics?.daily_call_volume?.map((item: DailyCallVolume) => ({
      label: getLocal(item?.date).format(DATE_FORMAT.AbbreviatedMonthDayYear),
      value: item?.count,
    })) ?? [];

  const bestPerformingCampaign =
    dashboardMetrics?.best_performing_campaign ?? [];
  const worstPerformingCampaign =
    dashboardMetrics?.worst_performing_campaign ?? [];

  const totalCallsMade = dashboardMetrics?.total_calls_made;
  const overAllConversion = dashboardMetrics?.overall_conversion_rate;
  const totalActiveCampaign = dashboardMetrics?.total_active_campaigns;
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
    dateFilter,
    setDateFilter,
  };
};
