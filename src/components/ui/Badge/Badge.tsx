import { ReactNode } from 'react';
import styles from './Badge.module.scss';

export type BadgeVariant =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'default'
  | 'unknown'
  | 'completed'
  | 'missed'
  | 'failed'
  | 'in_progress'
  | 'busy'
  | 'no_answer'
  | 'voicemail'
  | 'ivr'
  | 'canceled'
  | 'secondary';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  const classNames = [styles.badge, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return <span className={classNames}>{children}</span>;
}
