// import { useMutation } from "@tanstack/react-query";
// import { authService } from "../services/authService.service";
// import { useDispatch } from "react-redux";
// import { logout } from "@/app/store/Slice/authSlice";
// import { useNavigate } from "react-router-dom";

// export const useLogout = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     return useMutation({
//         mutationFn: () => authService.logout(),
//         onSuccess: () => {
//             dispatch(logout());
//             navigate("/login");
//         },
//         onError: (error) => {
//             console.log(error);
//         },
//     })
// }