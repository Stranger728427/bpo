import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/app/layout/MainLayout';
import { Spinner } from '@components/ui/Spinner/Spinner';
// Lazy loaded pages
const LoginPage = lazy(() =>
  import('@features/auth/pages/LoginPage').then((m) => ({
    default: m.LoginPage,
  }))
);

const DashboardPage = lazy(() =>
  import('@features/dashboard/pages/DashboardPage').then((m) => ({
    default: m.DashboardPage,
  }))
);

const CallLogsPage = lazy(() =>
  import('@features/call-logs/pages/CallLogsPage').then((m) => ({
    default: m.CallLogsPage,
  }))
);

const CampaignsPage = lazy(() =>
  import('@features/campaigns/pages/CampaignsPage').then((m) => ({
    default: m.CampaignsPage,
  }))
);

const AIStudioPage = lazy(() =>
  import('@features/ai-studio/pages/AIStudioPage').then((m) => ({
    default: m.AIStudioPage,
  }))
);

const LeadListPage = lazy(() =>
  import('@features/lead-list/pages/LeadListPage').then((m) => ({
    default: m.LeadListPage,
  }))
);

// eslint-disable-next-line react-refresh/only-export-components
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Spinner fullScreen />}>{children}</Suspense>
);

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <SuspenseWrapper>
        <LoginPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <DashboardPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'call-logs',
        element: (
          <SuspenseWrapper>
            <CallLogsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'campaigns',
        element: (
          <SuspenseWrapper>
            <CampaignsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'ai-studio',
        element: (
          <SuspenseWrapper>
            <AIStudioPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'lead-list',
        element: (
          <SuspenseWrapper>
            <LeadListPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
];
