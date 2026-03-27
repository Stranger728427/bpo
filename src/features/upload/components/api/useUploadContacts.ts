import { useMutation } from '@tanstack/react-query';
import { UploadService } from '../upload.service';

type UploadContactsPayload = {
  file: File;
  campaignId: string | undefined;
  csvId: string;
};

export const useUploadContactsMutation = () => {
  const uploadService = UploadService();

  return useMutation({
    mutationFn: (data: UploadContactsPayload) =>
      uploadService.uploadContacts(
        data.file,
        data.campaignId!,
        data.csvId
      ),
  });
};