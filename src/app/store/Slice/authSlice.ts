import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/features/auth/components/auth.type';

interface AuthState {
  user: User | null;
  token: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  expiresAt: null,
  isAuthenticated: false,
};

interface SetCredentialsPayload {
  user: User;
  token: string;
  expiresIn: number;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      const { user, token, expiresIn } = action.payload;
      state.user = user;
      state.token = token;
      state.expiresAt = Date.now() + expiresIn * 1000;
      state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.expiresAt = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;