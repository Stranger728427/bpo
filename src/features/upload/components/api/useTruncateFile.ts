import { useMutation } from "@tanstack/react-query";
import { UploadService } from "../upload.service";
import { message } from "antd";

export const useTruncateFileMutation = () => {
  const uploadService = UploadService();
  return useMutation({
    mutationFn: (id: string) => uploadService.deleteFile(id),

    onSuccess:()=> {
      message.success('File removed successfully');
    },
    
    onError: ()=>{
       message.error('Remove file failed');
    }
  });
};