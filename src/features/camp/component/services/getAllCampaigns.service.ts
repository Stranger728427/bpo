import { CampaignListFilters } from "../campaign.type";
import { axiosInstance } from "@/lib/axios/axiosInstance";

export const getAllCampaignsService = async (params?: CampaignListFilters) => {
    const response = await axiosInstance.get('/campaigns', { params });
    return response.data;
};