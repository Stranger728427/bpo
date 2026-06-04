import { useApi } from "@/lib/axios/interceptors";
import { CampaignMetricsRequest } from "./Types/Analytics";

export const AnalyticsService = () => {
  const { baseApi } = useApi();

  const requestMetrics = async (
    payload: CampaignMetricsRequest,
    signal:AbortSignal
  ): Promise<any> => {
    const result = await baseApi().post("/api/analytics/metrics", payload,{signal});
    return result.data;
  };

  return {
    requestMetrics,
  };
};