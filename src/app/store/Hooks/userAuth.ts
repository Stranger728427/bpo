import { notification } from 'antd';
import { useNavigate } from 'react-router';
import { logout } from '../Slice/userSlice';
import { store } from '../store';
import { persistor } from '@/app/store/store';
import { authService } from '@/features/auth/components/services/authService.service';

/**
 * Custom hook for handling authentication logic.
 */
const useAuth = () => {
    const navigate = useNavigate();

    const clearSession = async () => {
        store.dispatch(logout()); // Clear Redux state
        await persistor.purge();  // Clear persisted state
    };

    const signOut = async () => {
        try {
            await authService.logout();
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