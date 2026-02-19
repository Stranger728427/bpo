// import { updateUserAuth } from "@/app/store/Slice/userSlice";
// import { AuthService } from "@/features/auth/components/services/authService.service";
// import { useMutation } from "@tanstack/react-query";
// import { notification } from "antd";
// import { useDispatch } from "react-redux";
// import { AxiosError } from "axios";
// import { useState } from "react";

// export const useValidateAuthCode = () => {

//     const authService = AuthService()
//     const dispatch = useDispatch()
//     const [getUserError, setGetUserError] = useState<boolean>(false);

//    const fetchUserDetails = async () => {
// 		try {
// 			const response = await authService.getUserDetails();
// 			const data = response.data;
// 			dispatch(updateUserAuth(data));
// 		} catch (err) {
// 			notification.error({
// 				message: (err as any)?.response?.data?.message || 'Error occured while logging in.',
// 			});
// 			setGetUserError(true);
// 		}
// 	};
//     const validateAuthCode = async ({authCode, tenantName}: {authCode: string, tenantName: string}) => {
//         const response = await authService.validateAuthCode({
//             authCode,
//             tenantName,
//         });
//         return response;
//     };

//     return useMutation({
//         mutationFn: validateAuthCode,
//         mutationKey: ['validate-auth-code'],
//         onSuccess: () => {
//             notification.success({
//                 message: 'Success',
//                 description: 'Auth code validated successfully',
//             });
//             fetchUserDetails();
//         },
//         onError: (error: AxiosError<any>) => {
//             const apiError = error as {
//                 response?: { data?: { message?: string } };
//             };
//             const errorMessage =
//                 apiError.response?.data?.message ||
//                 'Invalid auth code. Please try again.';
//             notification.error({
//                 message: 'Error',
//                 description: errorMessage,
//             });
//         },
//     });
// }