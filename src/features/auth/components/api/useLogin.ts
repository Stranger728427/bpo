// import { useMutation } from "@tanstack/react-query";
// import { loginService } from "../services/login.service";
// import { LoginRequest } from "../auth.type";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "@/app/store/Slice/authSlice";
// import { useNavigate } from "react-router-dom";

// export const useLogin = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     return useMutation({
//         mutationFn: (data: LoginRequest) => loginService.login(data),
//         onSuccess: (response) => {
//             const { user, token } = response.data;
//             dispatch(
//                 setCredentials({
//                     user: user,
//                     token: token.access_token,
//                     expiresIn: token.expires_in,
//                 })
//             );
//             navigate('/');
//         },
//         onError: (error) => {
//             console.log(error);
//         },
//     });
// }