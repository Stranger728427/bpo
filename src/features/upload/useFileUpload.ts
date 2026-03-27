import { useRef, useState, useCallback } from 'react';
import { useTriggerCalls } from './components/api/useTriggerCall';
import { useTruncateFileMutation } from './components/api/useTruncateFile';
import { useUploadContactsMutation } from './components/api/useUploadContacts';
import { message } from 'antd';

type UseFileUploadProps = {
  campaignId?: string;
//   onUploadSuccess?: (csvId: string) => void;
};

export const useFileUpload = ({campaignId}:UseFileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileMutation = useUploadContactsMutation();
  const truncateFileMutation = useTruncateFileMutation();
  const triggerCallsMutation = useTriggerCalls();

  const resetState = useCallback(() => {
    setFile(null);
    fileMutation.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [fileMutation]);

  const handleFileUpload = useCallback(async (selectedFile: File | null) => {
    if (!selectedFile) {
      resetState();
      return;
    }

    try {
      await fileMutation.mutateAsync({file:selectedFile, campaignId, csvId:crypto.randomUUID()});
      message.success('Contacts uploaded successfully');
      setFile(selectedFile);
    } catch {
      message.error('Upload failed');
      resetState();
    }
  }, [fileMutation, resetState]);

  const handleTriggerCalls = useCallback(async () => {
    try {
      await triggerCallsMutation.mutateAsync(campaignId!);
      message.success('Calls triggered successfully');
      resetState();
    } catch {
      message.error('Trigger calls failed');
    }
  }, [triggerCallsMutation, resetState]);

  const handleTruncateFile = useCallback(async () => {
    try {
      await truncateFileMutation.mutateAsync();
      message.success('File removed successfully');
      resetState();
    } catch {
      message.error('Remove file failed');
    }
  }, [truncateFileMutation, resetState]);

  return {
    file,
    fileInputRef,
    handleFileUpload,
    handleTriggerCalls,
    handleTruncateFile,
    resetState,
    isUploading: fileMutation.isPending,
    isTriggering: triggerCallsMutation.isPending,
    isTruncating: truncateFileMutation.isPending,
    isSuccess:fileMutation?.isSuccess,
  };
};