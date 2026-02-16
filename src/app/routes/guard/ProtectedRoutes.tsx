import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const isAuthenticated = localStorage.getItem('token');
  const location = useLocation();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
