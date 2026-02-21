import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService.service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/app/store/Slice/userSlice";

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            dispatch(logout());
            navigate("/login");
        },
        onError: (error) => {
            console.log(error);
        },
    })
}