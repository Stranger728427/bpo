export const queryKeys = {
  // users: {
  //   all: ['users'] as const,
  //   lists: () => [...queryKeys.users.all, 'list'] as const,
  //   list: (filters: Record<string, unknown>) =>
  //     [...queryKeys.users.lists(), filters] as const,
  //   details: () => [...queryKeys.users.all, 'detail'] as const,
  //   detail: (id: string) => [...queryKeys.users.details(), id] as const,
  // },
  // auth: {
  //   all: ['auth'] as const,
  //   currentUser: () => [...queryKeys.auth.all, 'currentUser'] as const,
  // },
} as const;
