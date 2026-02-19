import axios, { AxiosInstance } from 'axios';
import { env } from '@/app/config/env';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 10000,
  // withCredentials: true,
});

export const axiosInstanceAuth: AxiosInstance = axios.create({
  baseURL: env.AUTH_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers:{

  }
});