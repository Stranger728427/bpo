import { useMutation } from "@tanstack/react-query";
import { UploadService } from "../upload.service";

export const useTriggerCalls = () => {
  const uploadService = UploadService();

  return useMutation({
    mutationFn: (id: string) => uploadService.triggerCalls(id),
  });
};