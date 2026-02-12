import { axiosInstance } from '@/lib/axios/axiosInstance';

export const triggerCalls = async () => {
  return await axiosInstance.post(
    '/load-feedback-calls'
  );
};