const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  APP_ENV: getEnvVar('VITE_APP_ENV', 'development'),
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
} as const;
