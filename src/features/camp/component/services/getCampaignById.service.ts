import { axiosInstance } from "@/lib/axios/axiosInstance";

export const getCampaignByIdService = async (id: string) => {
    const response = await axiosInstance.get(`/campaigns/${id}`);
    return response.data;
};
