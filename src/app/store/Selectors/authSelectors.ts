import type { RootState } from '@store/store';


export const selectIsAuthenticated = (state: RootState) =>
  state.UserAuth.value;

