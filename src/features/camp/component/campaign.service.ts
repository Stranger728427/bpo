import { axiosInstance } from '@/lib/axios/axiosInstance';
import {
  CampaignListFilters,
  Campaigns,
  CreateCampaignRequest,
} from './campaign.type';

export const campaignService = {
  createCampaign: async (campaign: CreateCampaignRequest) => {
    const response = await axiosInstance.post('/campaigns', campaign);
    return response.data;
  },

  getAllCampaignsService: async (params?: CampaignListFilters) => {
    const response = await axiosInstance.get('/campaigns', { params });
    return response.data;
  },

  getCampaignByIdService: async (id: string) => {
    const response = await axiosInstance.get(`/campaigns/${id}`);
    return response.data;
  },

  updateCampaignService: async (id: string, payload: Campaigns) => {
    const response = await axiosInstance.put(`/api/campaign/${id}`, payload);
    return response.data;
  },
};
