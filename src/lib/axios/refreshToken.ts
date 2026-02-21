import { store } from '@/app/store/store';
import { updateUserAuth } from '@/app/store/Slice/userSlice';
import { authService } from '@/features/auth/components/services/authService.service';

export const refreshTokenFlow = async () => {

  const response = await authService.refreshToken();
  
  const newAccessToken = response?.data?.accessToken;

  //  Update Redux with latest token
  store.dispatch(
    updateUserAuth({
      accessToken: newAccessToken,
    })
  );

  return newAccessToken;
};