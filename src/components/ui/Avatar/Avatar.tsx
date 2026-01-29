import { Avatar as AntdAvatar } from 'antd';
import type { AvatarProps as AntdAvatarProps } from 'antd';
import styles from './Avatar.module.scss';

export interface AvatarProps extends AntdAvatarProps {
  /**
   * Avatar status indicator.
   */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /**
   * Show status indicator.
   * @default false
   */
  showStatus?: boolean;
}

/**
 * Avatar component built on Ant Design Avatar.
 *
 * Provides user profile images, icons, or text avatars with optional status indicators.
 *
 * @example
 * ```tsx
 * // Avatar with image
 * <Avatar src="https://example.com/avatar.jpg" />
 *
 * // Avatar with text
 * <Avatar>JD</Avatar>
 *
 * // Avatar with icon
 * <Avatar icon={<UserOutlined />} />
 *
 * // Avatar with status
 * <Avatar status="online" showStatus>JD</Avatar>
 *
 * // Different sizes
 * <Avatar size="small">JD</Avatar>
 * <Avatar size={64}>JD</Avatar>
 *
 * // Different shapes
 * <Avatar shape="square">JD</Avatar>
 * ```
 */
export function Avatar({
  status,
  showStatus = false,
  className = '',
  ...props
}: AvatarProps) {
  const classNames = [styles.avatar, className].filter(Boolean).join(' ');

  if (showStatus && status) {
    return (
      <div className={styles.avatarWrapper}>
        <AntdAvatar className={classNames} {...props} />
        <span
          className={`${styles.status} ${styles[`status--${status}`]}`}
          aria-label={`Status: ${status}`}
        />
      </div>
    );
  }

  return <AntdAvatar className={classNames} {...props} />;
}

// Export Avatar.Group as a sub-component
Avatar.Group = AntdAvatar.Group;
