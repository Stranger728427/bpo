import { COLORS } from '@/components/constants/Constant';
import { CALL_COLORS, LEAD_COLORS } from '@/service/Types/Analytics';
import { useMemo } from 'react';

export type LeadStatus = {
  label: string;
  count: number;
};

export type CallStatus = {
  label: string;
  count: number;
};

export type StatusBreakDownType = {
  name: string;
  value: number;
  fill: string;
};

export const useCampaignCharts = (
  leadStatusDistribution?: LeadStatus[],
  callStatusBreakDown?: CallStatus[]
) => {
  const mapChartData = (
    data: { label: string; count: number }[] | undefined,
    colorMap: Record<string, string>
  ): StatusBreakDownType[] =>
    data?.map((item) => ({
      name: item.label,
      value: item.count,
      fill: colorMap[item.label] ?? COLORS.fallback,
    })) ?? [];

  const leadChart = useMemo(
    () => mapChartData(leadStatusDistribution, LEAD_COLORS),
    [leadStatusDistribution]
  );

  const callStatusChart = useMemo(
    () => mapChartData(callStatusBreakDown, CALL_COLORS),
    [callStatusBreakDown]
  );

  const leadCenterValue: number = useMemo(() => {
    return leadChart.reduce((sum, item) => sum + item.value, 0);
  }, [leadChart]);

  const callCenterValue: number = useMemo(() => {
    return callStatusChart.reduce((sum, item) => sum + item.value, 0);
  }, [callStatusChart]);

  return {
    leadChart,
    callStatusChart,
    leadCenterValue,
    callCenterValue,
  };
};
