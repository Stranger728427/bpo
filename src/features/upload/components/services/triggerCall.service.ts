import { useApi } from "@/lib/axios/interceptors";

export const triggerCalls = async () => {
  const { baseApi } = useApi();
  return await baseApi().post('/load-feedback-calls');
};