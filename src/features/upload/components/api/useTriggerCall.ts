import { useMutation } from "@tanstack/react-query";
import { UploadService } from "../upload.service";

export const useTriggerCalls = () => {
  const uploadService = UploadService();
  return useMutation({
    mutationFn: uploadService.triggerCalls,
  });
};