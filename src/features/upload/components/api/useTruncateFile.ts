import { useMutation } from "@tanstack/react-query";
import { truncateFile } from "../services/truncateFile.service";

export const useTruncateFileMutation = () => {
  return useMutation({
    mutationFn: truncateFile,
  });
};