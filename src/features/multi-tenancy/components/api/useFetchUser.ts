import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { updateUserAuth } from "@/app/store/Slice/userSlice";
import { authService } from "@/features/auth/components/services/authService.service";

export const useFetchUserDetails = () => {

    const [getUserError, setGetUserError] = useState<boolean>(false);
    const dispatch = useDispatch();

        const fetchUserDetails = async () => {
            try {
                const response = await authService.getUserDetails();
                const data = response.data;
                dispatch(updateUserAuth(data));
                return data;
            } catch (err) {
                notification.error({
                    message:
                        (err as any)?.response?.data?.message ||
                        'Error occured while logging in.',
                });
                setGetUserError(true);
            }
        }

    const { data:userData, isError, isPending } = useQuery({
        queryKey: ['user-details'],
        queryFn: fetchUserDetails
    });

    return { getUserError, userData, isError, isPending, fetchUserDetails };
}