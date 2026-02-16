import { axiosInstance } from "@/lib/axios/axiosInstance";
import { CampaignListFilters } from "../campaign.type";

export const getAllCampaignsService = async (params?: CampaignListFilters) => {
    const response = await axiosInstance.get('/api/campaign', { params });
    return response.data;
};