# MyAI - Project Documentation for Claude

## Project Overview

**MyAI** is a production-ready React dashboard application built with Vite, TypeScript, and modern tooling. It follows a feature-based architecture with strict code quality standards.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Build Tool** | Vite 6.x |
| **Framework** | React 18.x |
| **Language** | TypeScript 5.x (strict mode) |
| **Routing** | React Router v6 |
| **Client State** | Redux Toolkit |
| **Server State** | TanStack Query v5 + Axios |
| **UI Library** | Ant Design v6 (wrapped components) |
| **Styling** | SCSS Modules (mobile-first) |
| **Testing** | Vitest + React Testing Library |
| **Documentation** | Storybook 8.x |
| **Code Quality** | ESLint + Prettier + Husky |
| **Deployment** | Docker (Nginx for production) |

---

## Project Structure

```
/MyAI
├── .claude/                         # Claude Code settings
├── .husky/                          # Git hooks (pre-commit)
├── .storybook/                      # Storybook configuration
│   ├── main.ts
│   └── preview.tsx
├── docker/
│   ├── nginx/nginx.conf             # Production nginx config
│   ├── Dockerfile.dev
│   └── Dockerfile.prod
├── public/
├── src/
│   ├── app/                         # Application core
│   │   ├── config/                  # env.ts - environment config
│   │   ├── layout/                  # MainLayout, DashboardLayout
│   │   ├── providers/               # AppProvider, QueryProvider
│   │   ├── routes/                  # AppRouter, routes.tsx
│   │   └── store/                   # Redux store, hooks, rootReducer
│   ├── components/                  # Shared components
│   │   ├── claude.md                # Component architecture docs
│   │   ├── errors/                  # ErrorBoundary, ErrorFallback
│   │   ├── layout/                  # Layout components (Header, Sidebar, etc.)
│   │   └── ui/                      # UI components (Button, Card, etc.)
│   ├── features/                    # Feature modules
│   │   ├── ai-studio/               # AI Studio feature
│   │   ├── call-logs/               # Call Logs feature
│   │   ├── campaigns/               # Campaigns feature
│   │   ├── dashboard/               # Dashboard feature
│   │   ├── layout-test/             # Layout Test feature
│   │   └── lead-list/               # Lead List feature
│   ├── lib/                         # External library configs
│   │   ├── antd/                    # Ant Design theme config
│   │   ├── axios/                   # Axios instance + interceptors
│   │   └── query/                   # TanStack Query client + keys
│   ├── styles/                      # Global SCSS
│   │   ├── abstracts/               # _variables, _mixins
│   │   ├── base/                    # _reset, _typography, _base
│   │   ├── layout/                  # _grid, _container
│   │   ├── themes/                  # _light, _dark
│   │   └── main.scss                # Entry point
│   ├── types/                       # Global TypeScript types
│   │   └── env.d.ts                 # Vite environment types
│   ├── utils/                       # Utility functions
│   │   └── helpers/                 # storage.ts, etc.
│   ├── App.tsx                      # Root component
│   └── main.tsx                     # Entry point
├── tests/
│   └── setup.ts                     # Vitest setup
├── .env.example                     # Environment template
├── docker-compose.yml
├── eslint.config.js
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

---

## Path Aliases

Use these import aliases (configured in `vite.config.ts` and `tsconfig.json`):

| Alias | Path |
|-------|------|
| `@/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@features/*` | `src/features/*` |
| `@hooks/*` | `src/hooks/*` |
| `@lib/*` | `src/lib/*` |
| `@services/*` | `src/services/*` |
| `@store/*` | `src/app/store/*` |
| `@styles/*` | `src/styles/*` |
| `@types/*` | `src/types/*` |
| `@utils/*` | `src/utils/*` |

---

## NPM Scripts

```bash
# Development
npm run dev              # Start dev server on localhost:3000
npm run build            # TypeScript check + production build
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format with Prettier
npm run format:check     # Check formatting

# Testing
npm run test             # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:ui          # Run tests with UI
npm run test:coverage    # Generate coverage report

# Storybook
npm run storybook        # Start Storybook on localhost:6006
npm run build-storybook  # Build static Storybook
```

---

## Environment Variables

Environment variables are defined in `.env` files and must be prefixed with `VITE_`.

```bash
# .env.example
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_ENV=development
```

Access via `src/app/config/env.ts`:

```typescript
import { env } from '@/app/config/env';

console.log(env.API_BASE_URL);      // API base URL
console.log(env.APP_ENV);           // 'development' | 'staging' | 'production'
console.log(env.IS_PRODUCTION);     // boolean
console.log(env.IS_DEVELOPMENT);    // boolean
```

---

## Component Guidelines

### UI Components Location

All reusable UI components are in `src/components/ui/`. See [src/components/claude.md](src/components/claude.md) for detailed component documentation.

### Import Pattern (IMPORTANT)

**Direct imports only - NO barrel exports:**

```typescript
// CORRECT
import { Button } from '@components/ui/Button/Button';
import { Card } from '@components/ui/Card/Card';
import { Modal } from '@components/ui/Modal/Modal';

// INCORRECT - DO NOT USE
import { Button, Card } from '@components/ui';
```

### Component File Structure

Each component has 4 files:

```
src/components/ui/ComponentName/
├── ComponentName.tsx           # Implementation
├── ComponentName.module.scss   # Styles
├── ComponentName.stories.tsx   # Storybook stories
└── ComponentName.test.tsx      # Unit tests
```

### Available UI Components

| Component | Description |
|-----------|-------------|
| `ActionMenu` | Context menu with actions (edit, delete, etc.) |
| `Avatar` | User avatar with image/initials support |
| `Badge` | Status badge/tag component |
| `Button` | Wraps antd Button with `fullWidth` prop |
| `Card` | Card with `variant` (elevated/outlined/filled) |
| `DatePicker` | Date selection component |
| `Drawer` | Side panel drawer |
| `Dropdown` | Dropdown menu |
| `Input` | Input with `label`, `error`, `helperText` |
| `Modal` | Modal with `isOpen`, `size` props |
| `Select` | Selection dropdown |
| `Spinner` | Loading indicator with `fullScreen` option |
| `Table` | Data table component |

### Layout Components

Located in `src/components/layout/`:

| Component | Description |
|-----------|-------------|
| `Layout` | Main page layout wrapper |
| `Header` | Top navigation header |
| `Sidebar` | Side navigation menu |
| `BodyWrapper` | Content area wrapper |
| `MainContent` | Main content container |

---

## State Management

### Redux Toolkit (Client State)

Store is configured in `src/app/store/store.ts`.

**Using typed hooks:**

```typescript
import { useAppDispatch, useAppSelector } from '@store/hooks';

// In component
const dispatch = useAppDispatch();
const someState = useAppSelector((state) => state.someSlice.value);
```

**Creating a slice:**

```typescript
// src/features/myFeature/store/mySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyState {
  value: string;
}

const initialState: MyState = {
  value: '',
};

export const mySlice = createSlice({
  name: 'my',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = mySlice.actions;
export default mySlice.reducer;
```

### TanStack Query (Server State)

Query client is configured in `src/lib/query/queryClient.ts`.

**Query keys pattern** (`src/lib/query/queryKeys.ts`):

```typescript
export const queryKeys = {
  users: {
    all: ['users'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.users.all, 'list', filters] as const,
    detail: (id: string) => [...queryKeys.users.all, 'detail', id] as const,
  },
} as const;
```

**Using queries:**

```typescript
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@lib/query/queryKeys';
import { axiosInstance } from '@lib/axios/axiosInstance';

const { data, isLoading, error } = useQuery({
  queryKey: queryKeys.users.list({ page: 1 }),
  queryFn: () => axiosInstance.get('/users').then((res) => res.data),
});
```

---

## Routing

Routes are defined in `src/app/routes/routes.tsx` using React Router v6.

**Current Routes:**

| Path | Page | Description |
|------|------|-------------|
| `/` | DashboardPage | Main dashboard |
| `/call-logs` | CallLogsPage | Call logs listing |
| `/campaigns` | CampaignsPage | Campaign management |
| `/ai-studio` | AIStudioPage | AI Studio workspace |
| `/lead-list` | LeadListPage | Lead list management |

**Key patterns:**
- Lazy loading with `React.lazy()` and `Suspense`
- Layout components wrap route groups
- `<Navigate>` for redirects

**Adding a new route:**

```typescript
// 1. Create the page component
// src/features/myFeature/pages/MyPage.tsx

// 2. Add lazy import in routes.tsx
const MyPage = lazy(() =>
  import('@features/myFeature/pages/MyPage').then((m) => ({
    default: m.MyPage,
  }))
);

// 3. Add route config
{
  path: '/my-route',
  element: (
    <SuspenseWrapper>
      <MyPage />
    </SuspenseWrapper>
  ),
}
```

---

## Styling

### SCSS Architecture

Global styles are in `src/styles/`:

- **abstracts/** - Variables (`_variables.scss`), mixins (`_mixins.scss`)
- **base/** - Reset, typography, base styles
- **layout/** - Grid, container utilities
- **themes/** - Light (`_light.scss`) and dark (`_dark.scss`) themes

### Using SCSS Variables

SCSS abstracts are auto-imported in all `.scss` files via Vite config:

```scss
// Component.module.scss - variables available without import
.myClass {
  color: $color-primary;
  padding: $spacing-md;
  border-radius: $border-radius-md;

  @include media-up('md') {
    padding: $spacing-lg;
  }
}
```

### Ant Design Theme

Theme tokens are defined in `src/lib/antd/theme.ts`. The theme syncs with SCSS variables:

| SCSS Variable | Antd Token | Value |
|--------------|------------|-------|
| `$color-primary` | `colorPrimary` | `#8b5cf6` |
| `$color-success` | `colorSuccess` | `#22c55e` |
| `$color-warning` | `colorWarning` | `#f59e0b` |
| `$color-error` | `colorError` | `#ef4444` |

### Theme Switching

```typescript
// Set theme via data attribute
document.documentElement.setAttribute('data-theme', 'dark'); // or 'light'
```

---

## Testing

### Running Tests

```bash
npm run test             # Watch mode
npm run test:run         # Single run
npm run test:coverage    # With coverage
```

### Writing Tests

```typescript
// Component.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfigProvider } from 'antd';
import { lightTheme } from '@lib/antd/theme';
import { MyComponent } from './MyComponent';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ConfigProvider theme={lightTheme}>
      {ui}
    </ConfigProvider>
  );
};

describe('MyComponent', () => {
  it('renders correctly', () => {
    renderWithTheme(<MyComponent>Content</MyComponent>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('handles click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(<MyComponent onClick={onClick}>Click me</MyComponent>);

    await user.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

---

## Storybook

Run Storybook:

```bash
npm run storybook  # Opens on localhost:6006
```

### Writing Stories

```typescript
// Component.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta = {
  title: 'UI/MyComponent',
  component: MyComponent,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};
```

---

## Adding New Features

### Feature Module Structure

```
src/features/myFeature/
├── api/                    # API functions
│   └── myFeatureApi.ts
├── components/             # Feature-specific components
│   └── MyComponent.tsx
├── hooks/                  # Feature-specific hooks
│   └── useMyFeature.ts
├── pages/                  # Page components
│   └── MyFeaturePage.tsx
├── store/                  # Redux slice (if needed)
│   └── myFeatureSlice.ts
└── types/                  # Feature-specific types
    └── index.ts
```

---

## Docker

### Development

```bash
docker-compose up dev  # Starts dev server with hot reload
```

### Production

```bash
docker-compose up prod  # Builds and serves via Nginx on port 80
```

---

## Code Quality Rules

### Pre-commit Hooks

Husky runs on every commit:
1. ESLint fix on `.ts`, `.tsx` files
2. Prettier format on all staged files

### TypeScript

- Strict mode enabled
- No unused locals/parameters
- No implicit any

### ESLint

- React hooks rules
- React refresh rules
- Storybook rules
- Prettier integration

---

## Common Tasks

### Create a New UI Component

1. Create folder: `src/components/ui/NewComponent/`
2. Add files: `NewComponent.tsx`, `.module.scss`, `.stories.tsx`, `.test.tsx`
3. Follow existing component patterns (see Button or Card for reference)
4. Test with Storybook: `npm run storybook`

### Add a New Page

1. Create page in feature: `src/features/myFeature/pages/MyPage.tsx`
2. Add lazy import in `src/app/routes/routes.tsx`
3. Add route configuration

### Add to Redux Store

1. Create slice in `src/features/myFeature/store/mySlice.ts`
2. Add to `src/app/store/rootReducer.ts`
3. Use typed hooks: `useAppDispatch`, `useAppSelector`

### Add API Integration

1. Create API functions in `src/features/myFeature/api/`
2. Define query keys in `src/lib/query/queryKeys.ts`
3. Use TanStack Query hooks in components

---

## Troubleshooting

### SCSS Variables Not Available

Ensure Vite config has `additionalData`:
```typescript
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@use "${resolve(__dirname, './src/styles/abstracts')}" as *;`,
    },
  },
},
```

### Path Aliases Not Working

Check both `vite.config.ts` and `tsconfig.json` have matching alias configurations.

### Tests Failing

1. Run `npm run test:run` for detailed output
2. Check `tests/setup.ts` is properly configured
3. Ensure components are wrapped with required providers

### Ant Design Styles Missing

Ensure `AntdThemeProvider` wraps the app in `src/lib/antd/AntdThemeProvider.tsx`.
