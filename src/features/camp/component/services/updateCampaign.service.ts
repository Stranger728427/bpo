import { Campaigns } from "../campaign.type";
import { axiosInstance } from "@/lib/axios/axiosInstance";

export const updateCampaignService = async (id: string, payload: Campaigns) => {
    const response = await axiosInstance.put(`/api/campaign/${id}`, payload);
    return response.data;
};