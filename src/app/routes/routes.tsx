import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/app/layout/MainLayout';
import { Spinner } from '@components/ui/Spinner/Spinner';
import { RoutePath } from './RouthPath';

/* =========================
   Lazy Loaded Pages
========================= */

const LoginPage = lazy(() => import('@features/auth/pages/LoginPage'));
const DashboardPage = lazy(() => import('@features/dashboard/pages/DashboardPage'));
const CallLogsPage = lazy(() => import('@features/call-logs/pages/CallLogsPage'));
const CampaignsPage = lazy(() => import('@features/campaigns/pages/CampaignsPage'));
const AIStudioPage = lazy(() => import('@features/ai-studio/pages/AIStudioPage'));
const LeadListPage = lazy(() => import('@features/lead-list/pages/LeadListPage'));
const CallPage = lazy(() => import('@features/call/pages/CallPage'));
const Campaign = lazy(() => import('@features/camp/pages/Campaign'));


/* =========================
   Suspense Wrapper Helper
========================= */

const withSuspense = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<Spinner fullScreen />}>
    <Component />
  </Suspense>
);

/* =========================
   Routes Config
========================= */

export const routes: RouteObject[] = [
  {
    path: RoutePath.LOGIN,
    element: withSuspense(LoginPage),
  },
  {
    path: RoutePath.ROOT,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: withSuspense(CallPage),
      },
      {
        path: RoutePath.CAMPAIGN,
        element: withSuspense(Campaign),
      },
      {
        path: RoutePath.DASHBOARD,
        element: withSuspense(DashboardPage),
      },
      {
        path: RoutePath.CALL_LOGS,
        element: withSuspense(CallLogsPage),
      },
      {
        path: RoutePath.CALL_LOGS,
        element: withSuspense(CampaignsPage),
      },
      {
        path: RoutePath.AI_STUDIO,
        element: withSuspense(AIStudioPage),
      },
      {
        path: RoutePath.LEAD_LIST,
        element: withSuspense(LeadListPage),
      },
    ],
  },
];
