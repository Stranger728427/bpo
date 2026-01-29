import { Layout } from '@components/layout/Layout/Layout';
import { Header } from '@components/layout/Header/Header';
import { BodyWrapper } from '@components/layout/BodyWrapper/BodyWrapper';
import { Sidebar } from '@components/layout/Sidebar/Sidebar';
import { MainContent } from '@components/layout/MainContent/MainContent';
import { useLayout } from '@components/layout/LayoutContext';
import styles from './LayoutTestPage.module.scss';

function HeaderContent() {
  const { toggleSidebar } = useLayout();

  return (
    <>
      <div className={styles.headerLeft}>
        <button className={styles.menuButton} onClick={toggleSidebar}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className={styles.logo}>
          <span className={styles.logoText}>MYai</span>
          <span className={styles.logoSuperscript}>500</span>
        </div>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.credits}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 8H18" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="14" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>12,430</span>
        </div>
        <button className={styles.notificationBtn}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 7C15 5.67392 14.4732 4.40215 13.5355 3.46447C12.5979 2.52678 11.3261 2 10 2C8.67392 2 7.40215 2.52678 6.46447 3.46447C5.52678 4.40215 5 5.67392 5 7C5 11.25 3 13 3 13H17C17 13 15 11.25 15 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.73 16C11.5542 16.3031 11.3019 16.5547 10.9982 16.7295C10.6946 16.9044 10.3504 16.9965 10 16.9965C9.64964 16.9965 9.30541 16.9044 9.00179 16.7295C8.69818 16.5547 8.44583 16.3031 8.27 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className={styles.avatar}>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User avatar" />
        </div>
      </div>
    </>
  );
}

function SidebarContent() {
  const { isSidebarExpanded } = useLayout();

  const navItems = [
    { label: 'Dashboard', icon: '📊' },
    { label: 'Call Logs', icon: '📞' },
    { label: 'Campaigns', icon: '🎯' },
    { label: 'AI Studio', icon: '🤖' },
    { label: 'Lead List', icon: '📋' },
  ];

  return (
    <div className={styles.navList}>
      {navItems.map((item) => (
        <button key={item.label} className={styles.navItem}>
          <span className={styles.navIcon}>{item.icon}</span>
          {isSidebarExpanded && <span className={styles.navLabel}>{item.label}</span>}
        </button>
      ))}
    </div>
  );
}

export function LayoutTestPage() {
  return (
    <Layout>
      <Header>
        <HeaderContent />
      </Header>
      <BodyWrapper>
        <Sidebar>
          <SidebarContent />
        </Sidebar>
        <MainContent>
          <div className={styles.content}>
            <h1>Layout Test Page</h1>
            <p>This is a test page to preview the new layout components.</p>
            <p>Click the hamburger menu to toggle the sidebar.</p>
            <div className={styles.scrollTest}>
              {Array.from({ length: 50 }).map((_, i) => (
                <p key={i}>Scroll test line {i + 1}</p>
              ))}
            </div>
          </div>
        </MainContent>
      </BodyWrapper>
    </Layout>
  );
}
