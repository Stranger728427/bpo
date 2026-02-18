import { axiosInstance } from "@/lib/axios/axiosInstance";
import { CampaignListFilters } from "../campaign.type";

export const getAllCampaignsService = async (params?: CampaignListFilters) => {
    const response = await axiosInstance.get('/campaigns', { params });
    return response.data;
};