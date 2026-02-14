import { axiosInstance } from "@/lib/axios/axiosInstance";

export const truncateFile = async () => {
  return await axiosInstance.post('/truncate_data');
};