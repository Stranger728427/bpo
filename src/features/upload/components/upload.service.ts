import { useApi } from "@/lib/axios/interceptors";


export const UploadService = () => {
    const { baseApi } = useApi();

const uploadContacts = async (
  file: File,
  campaignId: string,
  // csvId: string
) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('campaign_id', campaignId);
  // formData.append('csvId', csvId);

  return baseApi().post(
    `/campaigns/upload-leads`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

const deleteFile = async (id: string) => {
  return baseApi().delete(`/campaigns/${id}/leads`);
};

const triggerCalls = async (id:string) => {
    return baseApi().post(`/get_num_feedback`,{campaign_id:id});
}

    return {
        uploadContacts,
        deleteFile,
        triggerCalls,
    }
}
