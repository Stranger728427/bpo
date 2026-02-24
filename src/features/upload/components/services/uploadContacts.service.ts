import { useApi } from "@/lib/axios/interceptors";

export const uploadContacts = async (file: File) => {
  const { baseApi } = useApi();
  const formData = new FormData();
  formData.append('file', file);

  return await baseApi().post(
    '/feedback/upload-contacts',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};