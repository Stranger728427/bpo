import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useCurrentUser from '@/app/store/Hooks/useCurrentUser';

export const ProtectedRoutes = () => {
  const currentUser = useCurrentUser();
  const location = useLocation();
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
