import { useMutation } from '@tanstack/react-query';
import { UploadService } from '../upload.service';
import { message } from 'antd';

type UploadContactsPayload = {
  file: File;
  campaignId: string;
};

export const useUploadContactsMutation = () => {
  const uploadService = UploadService();

  return useMutation({
    mutationFn: (data: UploadContactsPayload) =>
      uploadService.uploadContacts(
        data.file,
        data.campaignId!,
      ),

    onSuccess: () => {
      message.success('Contacts uploaded successfully');
    },

    onError: () => {
      message.error('Upload failed');
    },
  });


};