import { ReactNode } from 'react';
import { useLayout } from '../LayoutContext';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  children?: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const { isSidebarExpanded } = useLayout();

  return (
    <aside
      className={`${styles.sidebar} ${isSidebarExpanded ? styles.expanded : styles.collapsed}`}
    >
      <nav className={styles.nav}>{children}</nav>
    </aside>
  );
}
