export const queryKeys = {
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  auth: {
    all: ['auth'] as const,
    currentUser: () => [...queryKeys.auth.all, 'currentUser'] as const,
  },
  call: {
    all: ['call'] as const,
    lists: () => [...queryKeys.call.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.call.lists(), filters] as const,
    details: () => [...queryKeys.call.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.call.details(), id] as const,
  },

 analytics: {
    dashboard: ['analytics', 'dashboard'] as const,

    dashboardMetrics: (filters?: any) =>
      ['analytics', 'dashboard', 'metrics', filters] as const,
  },

  campaignAnalytics: {
    campaign: ['analytics', 'campaign'] as const,

    campaignMetrics: (campaignId: string, filters?: any) =>
      ['analytics', 'campaign', campaignId, 'metrics', filters] as const,
  },
} as const;

