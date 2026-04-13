import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/app/layout/MainLayout';
import { Spinner } from '@components/ui/Spinner/Spinner';
import { RoutePath } from './RouthPath';
import { ProtectedRoutes } from './guard/ProtectedRoutes';

import { PublicRoute } from './guard/PublicRoutes';

/* =========================
   Lazy Loaded Pages
========================= */

const TenantLogin = lazy(
  () => import('@features/multi-tenancy/pages/TenantLogin')
);

const Dashboard = lazy(
  ()=> import('@features/dashboard/pages/DashboardPage')
)

const MultiTenantRedirect = lazy(
  () => import('@features/multi-tenancy/pages/MultiTenantRedirect')
);
const CallLogs = lazy(() => import('@features/call/pages/CallPage'));
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
    element: <PublicRoute />,
    children: [
      {
        path: RoutePath.LOGIN,
        element: withSuspense(TenantLogin),
      },
      {
        path: RoutePath.MULTI_TENANT_REDIRECT,
        element: withSuspense(MultiTenantRedirect),
      },
    ],
  },
  {
    path: RoutePath.ROOT,
    element: <ProtectedRoutes />,
    children: [
      {
        path: '',
        element: <MainLayout />,
        children: [
          {
            index:true,
            element: withSuspense(Dashboard)
          },
          {
            path: RoutePath.CALL_LOGS,
            element: withSuspense(CallLogs),
          },
          {
            path: RoutePath.CAMPAIGN,
            element: withSuspense(Campaign),
          },
        ],
      },
    ],
  },
];
