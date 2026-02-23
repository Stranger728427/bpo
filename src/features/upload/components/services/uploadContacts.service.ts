import { axiosInstance } from "@/lib/axios/axiosInstance";

export const uploadContacts = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return await axiosInstance.post(
    '/feedback/upload-contacts',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};