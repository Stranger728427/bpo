import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * PublicRoute wrapper for auth pages (login, register, forgot password).
 * Redirects authenticated users to the dashboard or their intended destination.
 */
export function PublicRoute() {
  const isAuthenticated = localStorage.getItem('token');
  const location = useLocation();

  // Get the page they were trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/';

  if (isAuthenticated) {
    // Redirect authenticated users away from auth pages
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}
