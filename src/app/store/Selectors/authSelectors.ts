import type { RootState } from '@store/store';

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectToken = (state: RootState) => state.auth.token;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectExpiresAt = (state: RootState) => state.auth.expiresAt;

export const selectIsTokenExpired = (state: RootState) => {
  const expiresAt = state.auth.expiresAt;
  if (!expiresAt) return true;
  return Date.now() >= expiresAt;
};