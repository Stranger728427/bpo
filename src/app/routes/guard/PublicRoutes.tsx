import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useCurrentUser from '@/app/store/Hooks/useCurrentUser';

/**
 * PublicRoute wrapper for auth pages (login, register, forgot password).
 * Redirects authenticated users to the dashboard or their intended destination.
 */
export function PublicRoute() {
  const currentUser = useCurrentUser();
  const location = useLocation();

  // Get the page they were trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/';

  if (currentUser.currentUserId) {
    // Redirect authenticated users away from auth pages
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}
