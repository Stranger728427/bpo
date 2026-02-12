import { useMutation } from '@tanstack/react-query';
import { uploadContacts } from '../services/uploadContacts.service';

export const useUploadContactsMutation = () => {
  return useMutation({
    mutationFn: uploadContacts,
  });
};