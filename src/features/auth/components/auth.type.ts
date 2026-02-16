/**
 * Auth-related types matching the backend API
 */

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  company?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TokenInfo {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
  refresh_token?: string;
}

export interface AuthResponse {
  user: User;
  token: TokenInfo;
}

export interface LoginRequest {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface SignupRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  password_confirmation: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface UpdateProfileRequest {
  full_name?: string;
  phone?: string;
  company?: string;
  avatar_url?: string;
}

export interface UpdateProfileResponse {
  user: User;
  message: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  token: TokenInfo;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}