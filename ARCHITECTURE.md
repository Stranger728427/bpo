# React Application Architecture Plan

## Overview
Production-ready React application with Vite, TypeScript, and modern tooling.

## Tech Stack
- **Build Tool:** Vite
- **Language:** TypeScript
- **Routing:** React Router v6
- **State Management:** Redux Toolkit
- **Server State:** TanStack Query + Axios
- **Styling:** SCSS (mobile-first responsive design)
- **Testing:** Vitest + React Testing Library
- **Documentation:** Storybook
- **Code Quality:** ESLint + Prettier + Husky + lint-staged
- **Deployment:** Docker (dev & production)

---

## Folder Structure

```
/MyAI
├── .husky/                          # Git hooks
│   └── pre-commit
├── .storybook/                      # Storybook config
│   ├── main.ts
│   └── preview.ts
├── docker/
│   ├── nginx/nginx.conf
│   ├── Dockerfile.dev
│   └── Dockerfile.prod
├── public/
├── src/
│   ├── app/                         # Application core
│   │   ├── config/                  # env.ts, constants.ts
│   │   ├── providers/               # AppProvider, QueryProvider
│   │   ├── routes/                  # AppRouter, routes.tsx, PrivateRoute
│   │   ├── store/                   # Redux store, hooks, rootReducer
│   │   └── layout/                  # MainLayout, AuthLayout
│   ├── components/                  # Shared/reusable components
│   │   ├── ui/                      # Button, Input, Modal, Card, Spinner
│   │   ├── forms/                   # FormField, FormSelect
│   │   ├── feedback/                # Toast, Alert
│   │   └── errors/                  # ErrorBoundary, ErrorFallback
│   ├── features/                    # Feature modules
│   │   ├── auth/                    # api/, components/, hooks/, pages/, store/, types/
│   │   └── dashboard/               # Same structure per feature
│   ├── hooks/                       # Global custom hooks
│   ├── lib/                         # External library configs
│   │   ├── axios/                   # axiosInstance, interceptors
│   │   └── query/                   # queryClient, queryKeys
│   ├── services/                    # API services layer
│   ├── styles/                      # Global SCSS
│   │   ├── abstracts/               # _variables, _mixins, _breakpoints
│   │   ├── base/                    # _reset, _typography
│   │   ├── layout/                  # _grid, _container
│   │   └── themes/                  # _light, _dark
│   ├── types/                       # Global TypeScript types
│   ├── utils/                       # Utility functions
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   ├── setup.ts
│   ├── mocks/                       # MSW handlers
│   └── utils/                       # renderWithProviders
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
├── docker-compose.yml
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Implementation Steps

### Phase 1: Project Initialization
1. Initialize Vite project with React TypeScript template
2. Install core dependencies:
   - `react-router-dom`
   - `@reduxjs/toolkit`, `react-redux`
   - `@tanstack/react-query`, `@tanstack/react-query-devtools`
   - `axios`
   - `sass`

### Phase 2: Linting & Formatting
3. Configure ESLint with TypeScript and React rules
4. Set up Prettier with `.prettierrc`
5. Install and configure Husky + lint-staged for pre-commit hooks

### Phase 3: Testing Setup
6. Configure Vitest in `vite.config.ts`
7. Set up React Testing Library with test utilities
8. Create `tests/setup.ts` and `renderWithProviders` helper

### Phase 4: Storybook Setup
9. Initialize Storybook for React with Vite
10. Configure `.storybook/main.ts` and `preview.ts`

### Phase 5: Core Architecture
11. Create folder structure
12. Set up path aliases in `vite.config.ts` and `tsconfig.json`
13. Configure Redux store with typed hooks
14. Set up TanStack Query client with defaults
15. Create Axios instance with interceptors
16. Implement SCSS architecture with responsive mixins

### Phase 6: Routing & Providers
17. Create route configuration with lazy loading
18. Implement PrivateRoute for protected routes
19. Create AppProvider wrapping Redux, Query, and Router

### Phase 7: Shared Components
20. Create base UI components (Button, Input, Modal, Spinner)
21. Implement ErrorBoundary and ErrorFallback
22. Add Storybook stories for components

### Phase 8: Docker Setup
23. Create Dockerfile.dev for development
24. Create Dockerfile.prod with Nginx for production
25. Set up docker-compose.yml

---

## Key Configuration Files

### vite.config.ts
```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@features': resolve(__dirname, './src/features'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@lib': resolve(__dirname, './src/lib'),
      '@services': resolve(__dirname, './src/services'),
      '@store': resolve(__dirname, './src/app/store'),
      '@styles': resolve(__dirname, './src/styles'),
      '@types': resolve(__dirname, './src/types'),
      '@utils': resolve(__dirname, './src/utils'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/abstracts" as *;`,
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vitest/globals", "node"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@features/*": ["src/features/*"],
      "@hooks/*": ["src/hooks/*"],
      "@lib/*": ["src/lib/*"],
      "@services/*": ["src/services/*"],
      "@store/*": ["src/app/store/*"],
      "@styles/*": ["src/styles/*"],
      "@types/*": ["src/types/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": ["src", "tests"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### .eslintrc.cjs
```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' },
    ],
  },
};
```

### .prettierrc
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

---

## Dependencies

### package.json
```json
{
  "name": "myai",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,scss,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,scss,json}\"",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:run": "vitest run",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "prepare": "husky install"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^2.3.0",
    "@tanstack/react-query": "^5.62.0",
    "@tanstack/react-query-devtools": "^5.62.0",
    "axios": "^1.7.9",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-redux": "^9.2.0",
    "react-router-dom": "^6.28.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.16.0",
    "@storybook/addon-essentials": "^8.4.7",
    "@storybook/addon-interactions": "^8.4.7",
    "@storybook/addon-links": "^8.4.7",
    "@storybook/blocks": "^8.4.7",
    "@storybook/react": "^8.4.7",
    "@storybook/react-vite": "^8.4.7",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/node": "^22.10.2",
    "@types/react": "^18.3.14",
    "@types/react-dom": "^18.3.4",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.16.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "eslint-plugin-storybook": "^0.11.1",
    "globals": "^15.13.0",
    "husky": "^9.1.7",
    "jsdom": "^25.0.1",
    "lint-staged": "^15.2.11",
    "msw": "^2.6.8",
    "prettier": "^3.4.2",
    "sass": "^1.82.0",
    "storybook": "^8.4.7",
    "typescript": "^5.7.2",
    "typescript-eslint": "^8.18.0",
    "vite": "^6.0.3",
    "vitest": "^2.1.8"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,scss,md}": [
      "prettier --write"
    ]
  }
}
```

---

## Core Implementation Examples

### Redux Store (src/app/store/index.ts)
```typescript
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Typed Redux Hooks (src/app/store/hooks.ts)
```typescript
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### TanStack Query Client (src/lib/query/queryClient.ts)
```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
```

### Query Keys (src/lib/query/queryKeys.ts)
```typescript
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
} as const;
```

### Axios Instance (src/lib/axios/axiosInstance.ts)
```typescript
import axios, { AxiosInstance } from 'axios';
import { env } from '@/app/config/env';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Axios Interceptors (src/lib/axios/interceptors.ts)
```typescript
import { axiosInstance } from './axiosInstance';
import { store } from '@store/index';
import { logout } from '@features/auth/store/authSlice';

// Request interceptor - add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Environment Config (src/app/config/env.ts)
```typescript
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:8080/api'),
  APP_ENV: getEnvVar('VITE_APP_ENV', 'development'),
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
} as const;
```

### Environment Types (src/types/env.d.ts)
```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_ENV: 'development' | 'staging' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## SCSS Architecture

### Variables (src/styles/abstracts/_variables.scss)
```scss
// Colors
$color-primary: #3b82f6;
$color-primary-dark: #2563eb;
$color-secondary: #64748b;
$color-success: #22c55e;
$color-warning: #f59e0b;
$color-error: #ef4444;

// Typography
$font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
$font-size-base: 16px;
$font-size-sm: 0.875rem;
$font-size-lg: 1.125rem;
$font-size-xl: 1.25rem;
$font-size-2xl: 1.5rem;

// Spacing
$spacing-unit: 8px;
$spacing-xs: $spacing-unit * 0.5;
$spacing-sm: $spacing-unit;
$spacing-md: $spacing-unit * 2;
$spacing-lg: $spacing-unit * 3;
$spacing-xl: $spacing-unit * 4;

// Borders
$border-radius-sm: 4px;
$border-radius-md: 8px;
$border-radius-lg: 12px;
$border-radius-full: 9999px;

// Shadows
$shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
$shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
$shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

// Transitions
$transition-fast: 150ms ease;
$transition-normal: 250ms ease;
$transition-slow: 350ms ease;

// Z-index layers
$z-index-dropdown: 1000;
$z-index-modal: 1100;
$z-index-tooltip: 1200;
$z-index-toast: 1300;
```

### Breakpoints (src/styles/abstracts/_breakpoints.scss)
```scss
$breakpoints: (
  'xs': 0,
  'sm': 576px,
  'md': 768px,
  'lg': 992px,
  'xl': 1200px,
  'xxl': 1400px,
);

@function breakpoint-value($key) {
  @if map-has-key($breakpoints, $key) {
    @return map-get($breakpoints, $key);
  }
  @warn "Unknown breakpoint `#{$key}`.";
  @return null;
}
```

### Mixins (src/styles/abstracts/_mixins.scss)
```scss
@use 'breakpoints' as *;
@use 'variables' as *;

// Media query mixin - mobile first (min-width)
@mixin media-up($breakpoint) {
  $value: breakpoint-value($breakpoint);
  @if $value {
    @if $value == 0 {
      @content;
    } @else {
      @media (min-width: $value) {
        @content;
      }
    }
  }
}

// Media query mixin - max-width
@mixin media-down($breakpoint) {
  $value: breakpoint-value($breakpoint);
  @if $value {
    @media (max-width: ($value - 1px)) {
      @content;
    }
  }
}

// Flexbox helpers
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

// Typography
@mixin text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Focus states (accessibility)
@mixin focus-ring {
  outline: 2px solid $color-primary;
  outline-offset: 2px;
}

// Button base
@mixin button-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-sm $spacing-md;
  font-family: $font-family-base;
  font-size: $font-size-base;
  font-weight: 500;
  line-height: 1.5;
  border-radius: $border-radius-md;
  cursor: pointer;
  transition: background-color $transition-normal, border-color $transition-normal;

  &:focus-visible {
    @include focus-ring;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

// Container
@mixin container {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: $spacing-md;

  @include media-up('lg') {
    padding-inline: $spacing-lg;
  }
}
```

---

## Error Boundary (src/components/errors/ErrorBoundary.tsx)
```typescript
import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <ErrorFallback
          error={this.state.error}
          resetError={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}
```

---

## Routes with Lazy Loading (src/app/routes/routes.tsx)
```typescript
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/app/layout/MainLayout';
import { AuthLayout } from '@/app/layout/AuthLayout';
import { PrivateRoute } from './PrivateRoute';
import { Spinner } from '@components/ui';

// Lazy loaded pages
const LoginPage = lazy(() => import('@features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@features/auth/pages/RegisterPage'));
const DashboardPage = lazy(() => import('@features/dashboard/pages/DashboardPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Spinner fullScreen />}>{children}</Suspense>
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <PrivateRoute>
            <SuspenseWrapper>
              <DashboardPage />
            </SuspenseWrapper>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: (
          <SuspenseWrapper>
            <LoginPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'register',
        element: (
          <SuspenseWrapper>
            <RegisterPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <SuspenseWrapper>
        <NotFoundPage />
      </SuspenseWrapper>
    ),
  },
];
```

---

## Docker Configuration

### docker/Dockerfile.dev
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]
```

### docker/Dockerfile.prod
```dockerfile
# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production

COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### docker/nginx/nginx.conf
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml;

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  dev:
    build:
      context: .
      dockerfile: docker/Dockerfile.dev
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development

  prod:
    build:
      context: .
      dockerfile: docker/Dockerfile.prod
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
```

---

## Test Setup

### tests/setup.ts
```typescript
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

### tests/utils/renderWithProviders.tsx
```typescript
import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { rootReducer, RootState } from '@store/index';
import { queryClient } from '@lib/query/queryClient';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: ReturnType<typeof configureStore>;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
```

---

## Verification Plan

1. **Build & Dev Server**
   - `npm run dev` - starts on localhost:3000
   - `npm run build` - builds without errors

2. **Linting & Formatting**
   - `npm run lint` - no errors
   - `npm run format:check` - all files formatted
   - Commit triggers pre-commit hook

3. **Testing**
   - `npm run test` - tests pass
   - `npm run test:coverage` - coverage report generated

4. **Storybook**
   - `npm run storybook` - opens on localhost:6006

5. **Docker**
   - `docker-compose up dev` - dev container works
   - `docker-compose up prod` - production build serves on port 80

6. **Routing**
   - Routes work with lazy loading
   - Protected routes redirect when unauthenticated

7. **State Management**
   - Redux DevTools shows store state
   - React Query DevTools shows cached queries
