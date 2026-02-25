import { Dropdown } from '@components/ui/Dropdown/Dropdown';
import styles from './UserAvatar.module.scss';
import { IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '@/app/store/Hooks/useCurrentUser';
import { useAppDispatch } from '@/app/store/store';
import { logout as logoutAction } from '@/app/store/Slice/userSlice';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { AuthService } from '@/features/auth/components/services/authService.service';

/**
 * Get user initials from full name (first 2 characters of first and last name)
 */
function getInitials(fullName: string): string {
  if (!fullName) return '??';

  const names = fullName.trim().split(/\s+/);
  if (names.length === 1) {
    return names[0].substring(0, 2).toUpperCase();
  }

  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
}

interface UserAvatarDropdownProps {
  avatarUrl?: string;
}

export function UserAvatar({ avatarUrl }: UserAvatarDropdownProps) {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authService = AuthService();

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      // Clear Redux state and redirect regardless of API success/failure
      // to ensure the user is logged out locally
      dispatch(logoutAction());
      navigate('/login');
      message.success('Logged out successfully');
    },
  });

  const handleLogout = () => {
    logoutMutation.mutateAsync();
  };

  const initials = user?.currentUserName
    ? getInitials(user.currentUserName)
    : '??';

  const dropdownItems = [
    {
      key: 'email',
      label: (
        <div className={styles.emailItem}>
          <span className={styles.emailLabel}>Signed in as</span>
          <span className={styles.emailValue}>
            {user?.currentEmail || 'No email'}
          </span>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: (
        <div className={styles.logoutItem} onClick={handleLogout}>
          <IoIosLogOut size={20} />
          <span>Logout</span>
        </div>
      ),
    },
  ];

  return (
    <>
      {logoutMutation.isPending && <Spinner fullScreen tip="Logging out..." />}
      <Dropdown
        items={dropdownItems}
        trigger={['click']}
        placement="bottomRight"
      >
        <button className={styles.avatarButton} type="button">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="User avatar"
              className={styles.avatarImage}
            />
          ) : (
            <span className={styles.avatarInitials}>{initials}</span>
          )}
        </button>
      </Dropdown>
    </>
  );
}
