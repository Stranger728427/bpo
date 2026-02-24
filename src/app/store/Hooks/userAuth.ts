import axios from 'axios';
import { notification } from 'antd';
import { useNavigate } from 'react-router';
import { logout } from '../Slice/userSlice';
import { store } from '../store';
import { persistor } from '@/app/store/store';

/**
 * Clears the Redux store and persisted state.
 * Safe to call from anywhere (no React hook dependency).
 */
export const clearSession = async (): Promise<void> => {
    store.dispatch(logout());
    await persistor.purge();
};

/**
 * Standalone signOut function — safe to call from Axios interceptors or anywhere
 * outside of a React component tree.
 *
 * - Calls the logout API via plain axios (NOT through the interceptor instance)
 *   to avoid circular dependency: interceptors → useAuth → AuthService → interceptors.
 * - Uses window.location.href instead of useNavigate (no React hook required).
 */
export const signOut = async (): Promise<void> => {
    try {
        await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/authcentral/token`,
            { withCredentials: true }
        );
    } catch {
        // Even if the API call fails, we still clear the local session
    } finally {
        await clearSession();
        window.location.href = '/login';
    }
};

/**
 * Custom hook for handling authentication logic inside React components.
 * Wraps the standalone signOut with useNavigate for SPA-friendly navigation
 * and adds a user-facing notification on session expiry.
 */
const useAuth = () => {
    const navigate = useNavigate();

    const signOutWithNotify = async () => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_BASE_URL}/authcentral/token`,
                { withCredentials: true }
            );
            navigate('/login');
        } catch {
            notification.error({
                message: 'Authentication session expired. Please re-login',
            });
        } finally {
            await clearSession();
            navigate('/login'); // Ensure navigation happens
        }
    };

    return {
        signOut: signOutWithNotify,
        clearSession,
    };
};

export default useAuth;