import { authService } from "@/features/auth/components/services/authService.service";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { AxiosError } from "axios";

export const useValidateAuthCode = () => {

    const fetchUserDetails = () => {
        authService.getUserDetails();
    };

    const validateAuthCode = async ({authCode, tenantName}: {authCode: string, tenantName: string}) => {
        const response = await authService.validateAuthCode({
            authCode,
            tenantName,
        });
        return response;
    };

    return useMutation({
        mutationFn: validateAuthCode,
        mutationKey: ['validate-auth-code'],
        onSuccess: () => {
            notification.success({
                message: 'Success',
                description: 'Auth code validated successfully',
            });
            fetchUserDetails();
        },
        onError: (error: AxiosError<any>) => {
            const apiError = error as {
                response?: { data?: { message?: string } };
            };
            const errorMessage =
                apiError.response?.data?.message ||
                'Invalid auth code. Please try again.';
            notification.error({
                message: 'Error',
                description: errorMessage,
            });
        },
    });
}