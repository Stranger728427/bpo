import { authService } from '@/features/auth/components/services/authService.service';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { AxiosError } from 'axios';

export const useValidateTenant = (tenantName: string) => {
  const validateTenant = async () => {
    const response = await authService.validateTenant(tenantName);
    return response;
  };

  return useMutation({
    mutationFn: validateTenant,
    mutationKey: ['validate-tenant', tenantName],
    onSuccess: (response) => {
      message.success('Tenant validated successfully');
      if (response?.data?.redirectURI) window.location.href = response?.data?.redirectURI;
    },
    onError: (error:AxiosError<any>) => {
      const apiError = error as {
        response?: { data?: { message?: string } };
      };
      const errorMessage =
        apiError.response?.data?.message ||
        'Invalid tenant name. Please try again.';
      message.error(errorMessage);
    },
  });
};