import { Outlet, NavLink } from 'react-router-dom';
import styles from './DashboardLayout.module.scss';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/call-logs', label: 'Call Logs', icon: 'call' },
  { path: '/campaigns', label: 'Campaigns', icon: 'campaign' },
  { path: '/ai-studio', label: 'AI Studio', icon: 'ai' },
  { path: '/lead-list', label: 'Lead List', icon: 'list' },
];

const NavIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'dashboard':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      );
    case 'call':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 13.5V16C17 16.5523 16.5523 17 16 17C8.26801 17 2 10.732 2 3C2 2.44772 2.44772 2 3 2H5.5C5.77614 2 6 2.22386 6 2.5C6 3.88071 6.25 5.20855 6.71 6.44L4.78 8.37C5.91 10.57 7.43 12.09 9.63 13.22L11.56 11.29C12.7914 11.75 14.1193 12 15.5 12C15.7761 12 16 12.2239 16 12.5V13.5H17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'campaign':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 4L10 2L17 4V11C17 14.866 13.866 18 10 18C6.13401 18 3 14.866 3 11V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 2V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'ai':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="7" cy="8" r="1.5" fill="currentColor"/>
          <circle cx="13" cy="8" r="1.5" fill="currentColor"/>
          <path d="M7 13C7 13 8.5 14.5 10 14.5C11.5 14.5 13 13 13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'list':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="7" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="7" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="7" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="3.5" cy="5" r="1" fill="currentColor"/>
          <circle cx="3.5" cy="10" r="1" fill="currentColor"/>
          <circle cx="3.5" cy="15" r="1" fill="currentColor"/>
        </svg>
      );
    default:
      return null;
  }
};

export function DashboardLayout() {
  return (
    <div className={styles.layout}>
      {/* Top Header with Logo */}
      <header className={styles.topHeader}>
        <div className={styles.topHeaderLeft}>
          <button className={styles.menuButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className={styles.logo}>
            <span className={styles.logoText}></span>
            <span className={styles.logoSuperscript}>500</span>
          </div>
        </div>

        <div className={styles.topHeaderRight}>
          <div className={styles.credits}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 8H18" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="14" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>12,430</span>
          </div>

          <button className={styles.notificationBtn}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 7C15 5.67392 14.4732 4.40215 13.5355 3.46447C12.5979 2.52678 11.3261 2 10 2C8.67392 2 7.40215 2.52678 6.46447 3.46447C5.52678 4.40215 5 5.67392 5 7C5 11.25 3 13 3 13H17C17 13 15 11.25 15 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.73 16C11.5542 16.3031 11.3019 16.5547 10.9982 16.7295C10.6946 16.9044 10.3504 16.9965 10 16.9965C9.64964 16.9965 9.30541 16.9044 9.00179 16.7295C8.69818 16.5547 8.44583 16.3031 8.27 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className={styles.avatar}>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User avatar" />
          </div>
        </div>
      </header>

      <div className={styles.contentWrapper}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.active : ''}`
                }
              >
                <NavIcon type={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
