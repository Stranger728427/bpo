import { useMemo } from "react";

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

const LEAD_COLORS: Record<string, string> = {
  positive: "#4CAF50",
  neutral: "#FFC107",
  negative: "#F44336",
};

const CALL_COLORS: Record<string, string> = {
  completed: "#4CAF50",
  voicemail: "#FFC107",
  failed: "#F44336",
};

export const useCampaign = (
  leadStatusDistribution?: LeadStatus[],
  callStatusBreakDown?: CallStatus[]
) => {
  const leadChart: StatusBreakDownType[] = useMemo(() => {
    return (
      leadStatusDistribution?.map((item) => ({
        name: item.label,
        value: item.count,
        fill: LEAD_COLORS[item.label] ?? "#999",
      })) ?? []
    );
  }, [leadStatusDistribution]);

  const callStatusChart: StatusBreakDownType[] = useMemo(() => {
    return (
      callStatusBreakDown?.map((item) => ({
        name: item.label,
        value: item.count,
        fill: CALL_COLORS[item.label] ?? "#999",
      })) ?? []
    );
  }, [callStatusBreakDown]);

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