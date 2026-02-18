import { axiosInstance } from "@/lib/axios/axiosInstance";
import { CreateCampaignRequest } from "../campaign.type";

export const createCampaignService = async (campaign: CreateCampaignRequest) => {
    const response = await axiosInstance.post('/campaigns', campaign);
    return response.data;
};