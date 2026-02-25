import { useApi } from '@/lib/axios/interceptors';
import {
  CampaignListFilters,
  Campaigns,
  CreateCampaignRequest,
} from './campaign.type';

export const CampaignService = () => {
  const { baseApi } = useApi();

  const createCampaign= async(campaign: CreateCampaignRequest) => {
    const response = await baseApi().post('/campaigns', campaign);
    return response.data;
  }

  const getAllCampaignsService= async (params?: CampaignListFilters) => {
    const response = await baseApi().get('/campaigns', { params });
    return response.data;
  }

  const getCampaignByIdService=  async (id: string) => {
    const response = await baseApi().get(`/campaigns/${id}`);
    return response.data;
  }

  const updateCampaignService= async (id: string, payload: Campaigns) => {
    const response = await baseApi().put(`/api/campaign/${id}`, payload);
    return response.data;
  }
  return{
    createCampaign,
    getAllCampaignsService,
    getCampaignByIdService,
    updateCampaignService
  }
};
