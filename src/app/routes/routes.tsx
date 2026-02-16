import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/app/layout/MainLayout';
import { Spinner } from '@components/ui/Spinner/Spinner';
import { RoutePath } from './RouthPath';

/* =========================
   Lazy Loaded Pages
========================= */

const LoginPage = lazy(() => import('@features/auth/pages/LoginPage'));
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
    path: RoutePath.LOGIN,
    element: withSuspense(LoginPage),
  },
  {
    path: RoutePath.ROOT,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: withSuspense(CallLogs),
      },
      {
        path: RoutePath.CAMPAIGN,
        element: withSuspense(Campaign),
      },
    ],
  },
];
