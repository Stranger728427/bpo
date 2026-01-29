import { ReactNode } from 'react';
import { useLayout } from '../LayoutContext';
import styles from './MainContent.module.scss';

interface MainContentProps {
  children: ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  const { isSidebarExpanded } = useLayout();

  return (
    <main
      className={`${styles.mainContent} ${isSidebarExpanded ? styles.sidebarExpanded : styles.sidebarCollapsed}`}
    >
      {children}
    </main>
  );
}
