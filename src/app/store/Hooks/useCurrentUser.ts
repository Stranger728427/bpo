import { useSelector } from 'react-redux';
import { UserAuthSelector } from '../Slice/userSlice';

const useCurrentUser = () => {
  const user = useSelector(UserAuthSelector);

  const roles =
    user?.roles?.map((role) =>
      role?.roleName?.toLowerCase()
    ) || [];

  return {
    currentEmail: user?.email ?? '',
    currentUserId: user?.userId ?? '',

    isAdmin: roles.includes(
      'admin'
    ),

    isProvider: roles.includes(
      'provider'
    ),

    currentUserName:
      user?.name || user?.username || '',

    userRoles: roles.join(', '),
  };
};

export default useCurrentUser;
