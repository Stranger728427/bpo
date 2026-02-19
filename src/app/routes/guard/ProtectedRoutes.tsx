import useCurrentUser from '@/app/store/Hooks/useCurrentUser';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const currentUser = useCurrentUser();
  const location = useLocation();

  return currentUser.currentUserId ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
