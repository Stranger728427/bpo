import { ReactNode } from 'react';
import styles from './Header.module.scss';

interface HeaderProps {
  children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return <header className={styles.header}>{children}</header>;
}
