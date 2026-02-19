import { notification } from 'antd';
import { useNavigate } from 'react-router';
import { axiosInstance } from '@/lib/axios/axiosInstance';
import { env } from '@/app/config/env';
import { logout } from '../Slice/userSlice';
import { store } from '../store';
import { persistor } from '@/app/store/store';
import { siteConfig } from '@/components/constants/Constant';


/**
 * Custom hook for handling authentication logic.
 */
const useAuth = () => {
    const navigate = useNavigate();

    const {tenantName} = siteConfig

    const clearSession = async () => {
        store.dispatch(logout()); // Clear Redux state
        await persistor.purge();  // Clear persisted state
    };

    const signOut = async () => {
        try {
            await axiosInstance.delete(`${env.AUTH_BASE_URL}/authcentral/token`, {
                withCredentials: true,
                data: {
                    tenantName: tenantName
                },
            });

            navigate('/login');
        } catch (logoutError) {
            notification.error({
                message: 'Authentication session expired. Please re-login',
            });
            // Even if API fails, continue to clear local session
        } finally {
            await clearSession();
            navigate('/login'); // Ensure navigation happens
        }
    };

    return {
        signOut,
        clearSession,
    };
};

export default useAuth;