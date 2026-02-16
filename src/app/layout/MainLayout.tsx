import { Outlet, NavLink } from 'react-router-dom';
import { Layout } from '@components/layout/Layout/Layout';
import { Header } from '@components/layout/Header/Header';
import { BodyWrapper } from '@components/layout/BodyWrapper/BodyWrapper';
import { Sidebar } from '@components/layout/Sidebar/Sidebar';
import { MainContent } from '@components/layout/MainContent/MainContent';
import { useLayout } from '@components/layout/LayoutContext';
import styles from './MainLayout.module.scss';
import myAilogo from '../../../public/myAiLogo.svg';

import { MdOutlineCampaign } from 'react-icons/md';
import { BiPhone } from 'react-icons/bi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Avatar } from '@/components/ui/Avatar/Avatar';
import { UserAvatar } from '@/components/Avatar/UserAvatar';

// Navigation items configuration
const navItems = [
  { path: '/', label: 'Call Logs', icon: 'call' },
  { path: '/campaign', label: 'Campaign', icon: 'campaign' },
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
          <img src={myAilogo} alt="logo" className={styles.logoText}></img>
        </div>
      </div>
      <div className={styles.headerRight}>
        {/* <div className={styles.credits}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <rect
              x="2"
              y="4"
              width="16"
              height="12"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M2 8H18" stroke="currentColor" strokeWidth="1.5" />
            <circle
              cx="14"
              cy="12"
              r="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span>12,430</span>
        </div> */}
        {/* <button className={styles.notificationBtn} aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M15 7C15 5.67392 14.4732 4.40215 13.5355 3.46447C12.5979 2.52678 11.3261 2 10 2C8.67392 2 7.40215 2.52678 6.46447 3.46447C5.52678 4.40215 5 5.67392 5 7C5 11.25 3 13 3 13H17C17 13 15 11.25 15 7Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.73 16C11.5542 16.3031 11.3019 16.5547 10.9982 16.7295C10.6946 16.9044 10.3504 16.9965 10 16.9965C9.64964 16.9965 9.30541 16.9044 9.00179 16.7295C8.69818 16.5547 8.44583 16.3031 8.27 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button> */}
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
