import { Outlet, NavLink } from 'react-router-dom';
import { Layout } from '@components/layout/Layout/Layout';
import { Header } from '@components/layout/Header/Header';
import { BodyWrapper } from '@components/layout/BodyWrapper/BodyWrapper';
import { Sidebar } from '@components/layout/Sidebar/Sidebar';
import { MainContent } from '@components/layout/MainContent/MainContent';
import { useLayout } from '@components/layout/LayoutContext';
import styles from './MainLayout.module.scss';

import { RxHamburgerMenu } from 'react-icons/rx';
import { UserAvatar } from '@/components/Avatar/UserAvatar';
import { MaterialSymbolsLightDashboardOutlineRounded } from '@/components/icons/DashBoardIcon';
import { MaterialSymbolsLightCallLogOutlineSharp } from '@/components/icons/CallLogs.icons';
import { MaterialSymbolsLightCampaignOutline } from '@/components/icons/CampaignIcon';

// Navigation items configuration
const navItems = [
  { path: '/', label: 'Dashboard', icon: 'dashboard'},
  { path: '/call-logs', label: 'Call Logs', icon: 'call' },
  { path: '/campaign', label: 'Campaign', icon: 'campaign' },
];

const NavIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'dashboard':
      return <MaterialSymbolsLightDashboardOutlineRounded />;
    case 'call':
      return <MaterialSymbolsLightCallLogOutlineSharp />;
    case 'campaign':
      return <MaterialSymbolsLightCampaignOutline />;
    default:
      return null;
  }
};

function HeaderContent() {
  const { toggleSidebar } = useLayout();

  return (
    <>
      <div className={styles.headerLeft}>
        <button
          className={styles.menuButton}
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <RxHamburgerMenu size={24} />
        </button>
        <div className={styles.logo}>
          <img src="/myaiLogo.svg" alt="logo" className={styles.logoText}></img>
        </div>
      </div>
      <div className={styles.headerRight}>
        <UserAvatar />
      </div>
    </>
  );
}

function SidebarContent() {
  const { isSidebarExpanded } = useLayout();

  return (
    <div className={styles.navList}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ''}`
          }
        >
          <span className={styles.navIcon}>
            <NavIcon type={item.icon} />
          </span>
          {isSidebarExpanded && (
            <span className={styles.navLabel}>{item.label}</span>
          )}
        </NavLink>
      ))}
    </div>
  );
}

export function MainLayout() {
  return (
    <Layout defaultSidebarExpanded>
      <Header>
        <HeaderContent />
      </Header>
      <BodyWrapper>
        <Sidebar>
          <SidebarContent />
        </Sidebar>
        <MainContent>
          <Outlet />
        </MainContent>
      </BodyWrapper>
    </Layout>
  );
}
