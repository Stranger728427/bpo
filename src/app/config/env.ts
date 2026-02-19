const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  AUTH_BASE_URL: getEnvVar('VITE_AUTH_BASE_URL', 'https://api.stage.myvio.ai'), // tenant api 
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'https://myvio-backend.myvio.ai'), //  python api
  APP_ENV: getEnvVar('VITE_APP_ENV', 'development'),
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
} as const;
