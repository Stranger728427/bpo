import { useApi } from "@/lib/axios/interceptors";

export const truncateFile = async () => {
  const { baseApi } = useApi();
  return await baseApi().post('/truncate_data');
};