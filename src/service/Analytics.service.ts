import { useApi } from "@/lib/axios/interceptors";
import { CampaignMetricsRequest } from "./Types/Analytics";

export const AnalyticsService = () => {
  const { baseApi } = useApi();

  const requestMetrics = async (
    payload: CampaignMetricsRequest
  ): Promise<any> => {
    const result = await baseApi().post("/api/analytics/metrics", payload);
    return result.data;
  };

  return {
    requestMetrics,
  };
};