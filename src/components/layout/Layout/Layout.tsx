import { ReactNode } from 'react';
import { LayoutProvider } from '../LayoutContext';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
  defaultSidebarExpanded?: boolean;
}

export function Layout({ children, defaultSidebarExpanded = false }: LayoutProps) {
  return (
    <LayoutProvider defaultExpanded={defaultSidebarExpanded}>
      <div className={styles.layout}>{children}</div>
    </LayoutProvider>
  );
}
