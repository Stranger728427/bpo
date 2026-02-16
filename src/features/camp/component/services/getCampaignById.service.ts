import { axiosInstance } from "@/lib/axios/axiosInstance";

export const getCampaignByIdService = async (id: string) => {
    const response = await axiosInstance.get(`/api/campaign/${id}`);
    return response.data;
};
