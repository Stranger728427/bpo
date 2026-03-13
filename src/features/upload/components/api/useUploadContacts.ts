import { useMutation } from '@tanstack/react-query';
import { UploadService } from '../upload.service';

export const useUploadContactsMutation = () => {
  const uploadService = UploadService();
  return useMutation({
    mutationFn: uploadService.uploadContacts,
  });
};