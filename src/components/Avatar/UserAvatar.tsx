import { Dropdown } from '@components/ui/Dropdown/Dropdown';
import styles from './UserAvatar.module.scss';
import { message } from 'antd';
import { axiosInstance } from '@/lib/axios/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
// import { useLogout } from '@/features/auth/components/api/useLogout';

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
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  console.log(user);
  // const logoutMutation = useLogout();

  const logout = () =>
    axiosInstance.post(
      '/logout',
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      message.success('Logout successful');
      navigate('/login');
    },
    onError: () => {
      message.error('Logout failed');
    },
  });

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      message.success('Logout successful');
    } catch (error) {
      message.error('Logout failed');
    }
  };

  const initials = user?.full_name ? getInitials(user.full_name) : '??';

  const dropdownItems = [
    {
      key: 'email',
      label: (
        <div className={styles.emailItem}>
          <span className={styles.emailLabel}>Signed in as</span>
          <span className={styles.emailValue}>{user?.email || 'No email'}</span>
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
        <div className={styles.logoutItem}>
          <IoIosLogOut size={20} />
          <span onClick={handleLogout}>Logout</span>
        </div>
      ),
    },
  ];

  return (
    <Dropdown items={dropdownItems} trigger={['click']} placement="bottomRight">
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
  );
}
