import { Outlet, NavLink } from 'react-router-dom';
import { Layout } from '@components/layout/Layout/Layout';
import { Header } from '@components/layout/Header/Header';
import { BodyWrapper } from '@components/layout/BodyWrapper/BodyWrapper';
import { Sidebar } from '@components/layout/Sidebar/Sidebar';
import { MainContent } from '@components/layout/MainContent/MainContent';
import { useLayout } from '@components/layout/LayoutContext';
import styles from './MainLayout.module.scss';

import { MdOutlineCampaign } from 'react-icons/md';
import { BiPhone } from 'react-icons/bi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { UserAvatar } from '@/components/Avatar/UserAvatar';

// Navigation items configuration
const navItems = [
  { path: '/', label: 'Call Logs', icon: 'call' },
  // { path: '/campaign', label: 'Campaign', icon: 'campaign' },
];

const NavIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'call':
      return <BiPhone size={20} />;
    case 'campaign':
      return <MdOutlineCampaign size={20} />;
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
          <img src="/myAiLogo.svg" alt="logo" className={styles.logoText}></img>
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
