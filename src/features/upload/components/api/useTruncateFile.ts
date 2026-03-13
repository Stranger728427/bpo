import { useMutation } from "@tanstack/react-query";
import { UploadService } from "../upload.service";

export const useTruncateFileMutation = () => {
  const uploadService = UploadService();
  return useMutation({
    mutationFn: uploadService.truncateFile,
  });
};