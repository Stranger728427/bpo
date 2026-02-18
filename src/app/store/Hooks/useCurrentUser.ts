import { Role } from '../types';
import { useSelector } from 'react-redux';
import { UserAuthSelector } from '../Slice/userSlice';

const useCurrentUser = () => {
    const user = useSelector(UserAuthSelector);

    const roles = user?.roles?.map((role) => role?.toLowerCase()) || [];

    return {
        currentEmail: user?.email!,
        currentUserId: user?.userId!,
        isAdmin: roles?.includes(Role.ADMIN.toLowerCase()),
        isProvider: roles?.includes(Role.PROVIDER.toLowerCase()),
        currentUserName: user?.name || user?.username,
        userType: user?.userType!,
        userRoles: roles?.join(', '),
    };
};

export default useCurrentUser;
