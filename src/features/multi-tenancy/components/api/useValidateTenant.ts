import { authService, validateTenantRequest } from '@/features/auth/components/services/authService.service';
import { mutationKeys } from '@/lib/query/mutationKeys';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { AxiosError } from 'axios';

export const useValidateTenant = (tenantName: validateTenantRequest) => {
  const validateTenant = async () => {
    const response = await authService.validateTennant(tenantName);
    return response;
  };

  const validateTenantKeys = mutationKeys.validateTenant(tenantName.tenantName);

  return useMutation({
    mutationFn: validateTenant,
    mutationKey: validateTenantKeys,
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