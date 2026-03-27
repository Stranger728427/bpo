import { LLM_TYPE } from "@/components/constants/Constant";
import { useApi } from "@/lib/axios/interceptors";


export const UploadService = () => {
    const { baseApi } = useApi();

const uploadContacts = async (
  file: File,
  campaignId: string,
  csvId: string
) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('campaign_id', campaignId);
  formData.append('csvId', csvId);

  return baseApi().post(
    `/${LLM_TYPE}/campaign/upload-leads`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

const deleteFile = async (id: string) => {
  return baseApi().delete(`/${LLM_TYPE}/campaign/${id}/leads`);
};

const triggerCalls = async (id:string) => {
    return baseApi().post(`/${LLM_TYPE}/get_num_feedback`,{campaign_id:id});
}

    return {
        uploadContacts,
        deleteFile,
        triggerCalls,
    }
}
