# Component Architecture

## Overview

This project uses **Ant Design (antd)** as the base component library, wrapped with custom
components for extensibility and consistent API patterns. All UI components are located
in `src/components/ui/`.

## Design Principles

1. **Wrapper Pattern**: All components wrap Ant Design components, extending their props
2. **No Barrel Imports**: Import components directly from their file paths
3. **TypeScript First**: Full type safety with extended interfaces
4. **Theme Integration**: SCSS variables mapped to antd design tokens via ConfigProvider
5. **Storybook Documentation**: Every component has stories with autodocs
6. **Accessibility**: All components support keyboard navigation and ARIA attributes
7. **Responsive**: Components adapt to viewport sizes using antd responsive features

---

## Directory Structure

```
src/components/
├── claude.md                    # This file - architecture documentation
├── errors/
│   ├── ErrorBoundary.tsx
│   └── ErrorFallback.tsx
├── layout/                      # Layout components
│   ├── BodyWrapper/
│   ├── Header/
│   ├── Layout/
│   ├── LayoutContext.tsx
│   ├── MainContent/
│   └── Sidebar/
└── ui/
    ├── ActionMenu/              # Context menu with actions
    │   ├── ActionMenu.tsx
    │   ├── ActionMenu.module.scss
    │   ├── ActionMenu.stories.tsx
    │   └── ActionMenu.test.tsx
    ├── Avatar/                  # User avatar component
    │   ├── Avatar.tsx
    │   ├── Avatar.module.scss
    │   ├── Avatar.stories.tsx
    │   └── Avatar.test.tsx
    ├── Badge/                   # Status badge/tag
    │   ├── Badge.tsx
    │   ├── Badge.module.scss
    │   ├── Badge.stories.tsx
    │   └── Badge.test.tsx
    ├── Button/
    │   ├── Button.tsx
    │   ├── Button.module.scss
    │   ├── Button.stories.tsx
    │   └── Button.test.tsx
    ├── Card/
    │   ├── Card.tsx
    │   ├── Card.module.scss
    │   ├── Card.stories.tsx
    │   └── Card.test.tsx
    ├── DatePicker/              # Date selection
    │   ├── DatePicker.tsx
    │   ├── DatePicker.module.scss
    │   ├── DatePicker.stories.tsx
    │   └── DatePicker.test.tsx
    ├── Drawer/                  # Side panel drawer
    │   ├── Drawer.tsx
    │   ├── Drawer.module.scss
    │   ├── Drawer.stories.tsx
    │   └── Drawer.test.tsx
    ├── Dropdown/                # Dropdown menu
    │   ├── Dropdown.tsx
    │   ├── Dropdown.module.scss
    │   ├── Dropdown.stories.tsx
    │   └── Dropdown.test.tsx
    ├── Input/
    │   ├── Input.tsx
    │   ├── Input.module.scss
    │   ├── Input.stories.tsx
    │   └── Input.test.tsx
    ├── Modal/
    │   ├── Modal.tsx
    │   ├── Modal.module.scss
    │   ├── Modal.stories.tsx
    │   └── Modal.test.tsx
    ├── Select/                  # Selection dropdown
    │   ├── Select.tsx
    │   ├── Select.module.scss
    │   ├── Select.stories.tsx
    │   └── Select.test.tsx
    ├── Spinner/
    │   ├── Spinner.tsx
    │   ├── Spinner.module.scss
    │   ├── Spinner.stories.tsx
    │   └── Spinner.test.tsx
    └── Table/                   # Data table
        ├── Table.tsx
        ├── Table.module.scss
        ├── Table.stories.tsx
        └── Table.test.tsx
```

---

## Import Pattern

```typescript
// CORRECT: Direct imports (no barrel exports)
import { ActionMenu } from '@components/ui/ActionMenu/ActionMenu';
import { Avatar } from '@components/ui/Avatar/Avatar';
import { Badge } from '@components/ui/Badge/Badge';
import { Button } from '@components/ui/Button/Button';
import { Card } from '@components/ui/Card/Card';
import { DatePicker } from '@components/ui/DatePicker/DatePicker';
import { Drawer } from '@components/ui/Drawer/Drawer';
import { Dropdown } from '@components/ui/Dropdown/Dropdown';
import { Input } from '@components/ui/Input/Input';
import { Modal } from '@components/ui/Modal/Modal';
import { Select } from '@components/ui/Select/Select';
import { Spinner } from '@components/ui/Spinner/Spinner';
import { Table } from '@components/ui/Table/Table';

// INCORRECT: Barrel imports (DO NOT USE)
import { Button, Card } from '@components/ui';
```

---

## Theme Configuration

Theme tokens are defined in `src/lib/antd/theme.ts` and map to SCSS variables:

| SCSS Variable | Antd Token | Value |
|--------------|------------|-------|
| `$color-primary` | `colorPrimary` | `#8b5cf6` |
| `$color-success` | `colorSuccess` | `#22c55e` |
| `$color-warning` | `colorWarning` | `#f59e0b` |
| `$color-error` | `colorError` | `#ef4444` |
| `$font-family-base` | `fontFamily` | Inter, system fonts |
| `$border-radius-md` | `borderRadius` | `8` |

### Light/Dark Theme Switching

Theme switching uses the `data-theme` attribute on `<html>`:

```typescript
// Set dark theme
document.documentElement.setAttribute('data-theme', 'dark');

// Set light theme
document.documentElement.setAttribute('data-theme', 'light');

// The AntdThemeProvider automatically syncs with this attribute
```

---

## Component API Reference

### ActionMenu

Custom context menu with action items.

```typescript
import { ActionMenu } from '@components/ui/ActionMenu/ActionMenu';

const items = [
  { key: 'edit', label: 'Edit', icon: <EditIcon />, onClick: handleEdit },
  { key: 'delete', label: 'Delete', danger: true, onClick: handleDelete },
];

<ActionMenu items={items} />
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `ActionMenuItem[]` | - | Array of menu items |

**ActionMenuItem:**

| Prop | Type | Description |
|------|------|-------------|
| `key` | `string` | Unique item key |
| `label` | `string` | Item label text |
| `icon` | `ReactNode` | Optional icon |
| `danger` | `boolean` | Danger/destructive style |
| `onClick` | `() => void` | Click handler |

### Avatar

Wraps `antd/Avatar` with status indicator support.

```typescript
import { Avatar } from '@components/ui/Avatar/Avatar';

// Avatar with image
<Avatar src="https://example.com/avatar.jpg" />

// Avatar with text
<Avatar>JD</Avatar>

// Avatar with status
<Avatar status="online" showStatus>JD</Avatar>

// Avatar group
<Avatar.Group>
  <Avatar>A</Avatar>
  <Avatar>B</Avatar>
</Avatar.Group>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `'online' \| 'offline' \| 'away' \| 'busy'` | - | Status indicator |
| `showStatus` | `boolean` | `false` | Show status dot |
| `src` | `string` | - | Image URL |
| `size` | `number \| 'small' \| 'default' \| 'large'` | `'default'` | Avatar size |
| `shape` | `'circle' \| 'square'` | `'circle'` | Avatar shape |

### Badge

Status badge/tag component (custom implementation).

```typescript
import { Badge } from '@components/ui/Badge/Badge';

<Badge variant="success">Active</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="info">New</Badge>
<Badge>Default</Badge>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'success' \| 'warning' \| 'error' \| 'info' \| 'default'` | `'default'` | Badge color |
| `children` | `ReactNode` | - | Badge content |

### Button

Wraps `antd/Button` with custom extensions.

```typescript
import { Button } from '@components/ui/Button/Button';

// Primary button
<Button type="primary">Submit</Button>

// With loading state
<Button type="primary" loading>Saving...</Button>

// Full width
<Button type="primary" fullWidth>Block Button</Button>

// Danger action
<Button type="primary" danger>Delete</Button>

// Sizes
<Button size="small">Small</Button>
<Button size="middle">Medium</Button>
<Button size="large">Large</Button>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | `'default'` | Button type |
| `size` | `'small' \| 'middle' \| 'large'` | `'middle'` | Button size |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable button |
| `danger` | `boolean` | `false` | Danger state |
| `fullWidth` | `boolean` | `false` | Make button full width (custom) |
| `icon` | `ReactNode` | - | Icon to display |

### Card

Wraps `antd/Card` with variant support.

```typescript
import { Card } from '@components/ui/Card/Card';

<Card title="Section Title" variant="elevated">
  Content here
</Card>

<Card variant="outlined" hoverable>
  Hoverable card
</Card>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'elevated' \| 'outlined' \| 'filled'` | `'elevated'` | Card visual style |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding |
| `hoverable` | `boolean` | `false` | Enable hover effect |
| `title` | `ReactNode` | - | Card header title |

### DatePicker

Wraps `antd/DatePicker` with label and error support.

```typescript
import { DatePicker } from '@components/ui/DatePicker/DatePicker';

// Basic date picker
<DatePicker
  label="Birth Date"
  placeholder="Select date"
/>

// With time selection
<DatePicker
  label="Event Time"
  showTime
  placeholder="Select date and time"
/>

// With error
<DatePicker
  label="Date"
  error="This field is required"
/>

// Range picker
<DatePicker.RangePicker
  placeholder={['Start Date', 'End Date']}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label above picker |
| `error` | `string` | - | Error message |
| `helperText` | `string` | - | Helper text below picker |
| `fullWidth` | `boolean` | `true` | Make picker full width |
| `showTime` | `boolean` | `false` | Show time selection |

### Drawer

Wraps `antd/Drawer` with size presets.

```typescript
import { Drawer } from '@components/ui/Drawer/Drawer';

<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  title="Drawer Title"
  size="md"
>
  Drawer content
</Drawer>

// Full width drawer
<Drawer isOpen={isOpen} size="full" title="Full Drawer">
  Content
</Drawer>

// Left placement
<Drawer isOpen={isOpen} placement="left" title="Left Drawer">
  Content
</Drawer>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Control visibility |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | - | Size preset (320px, 480px, 720px, 100%) |
| `placement` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | Drawer position |
| `title` | `ReactNode` | - | Drawer header title |
| `onClose` | `() => void` | - | Close callback |

### Dropdown

Wraps `antd/Dropdown` for action menus.

```typescript
import { Dropdown } from '@components/ui/Dropdown/Dropdown';

const items = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2' },
  { type: 'divider' },
  { key: '3', label: 'Delete', danger: true },
];

<Dropdown items={items}>
  <Button>Actions</Button>
</Dropdown>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `MenuProps['items']` | - | Menu items array |
| `trigger` | `('click' \| 'hover' \| 'contextMenu')[]` | `['hover']` | Trigger mode |
| `placement` | `string` | `'bottomLeft'` | Dropdown position |

### Input

Wraps `antd/Input` with label and error support.

```typescript
import { Input } from '@components/ui/Input/Input';

<Input
  label="Email"
  placeholder="Enter your email"
  error={errors.email}
  helperText="We will never share your email"
/>

<Input
  label="Password"
  type="password"
  fullWidth
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label above input |
| `error` | `string` | - | Error message |
| `helperText` | `string` | - | Helper text below input |
| `fullWidth` | `boolean` | `true` | Make input full width |
| `prefix` | `ReactNode` | - | Prefix icon |
| `suffix` | `ReactNode` | - | Suffix icon |

### Modal

Wraps `antd/Modal` with simplified API.

```typescript
import { Modal } from '@components/ui/Modal/Modal';

<Modal
  isOpen={showModal}
  onCancel={() => setShowModal(false)}
  title="Confirm Action"
  size="md"
>
  Modal content here
</Modal>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Control visibility |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Modal width preset |
| `closeOnOverlayClick` | `boolean` | `true` | Close on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `title` | `ReactNode` | - | Modal header title |
| `footer` | `ReactNode` | - | Modal footer |

### Select

Wraps `antd/Select` with label and error support.

```typescript
import { Select } from '@components/ui/Select/Select';

// Basic select
<Select
  label="Country"
  placeholder="Select a country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
/>

// Multi-select
<Select
  mode="multiple"
  label="Skills"
  placeholder="Select skills"
  options={skills}
/>

// With search
<Select
  showSearch
  label="Search Country"
  placeholder="Search..."
  options={countries}
/>

// With error
<Select
  label="Category"
  error="This field is required"
  options={categories}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label above select |
| `error` | `string` | - | Error message |
| `helperText` | `string` | - | Helper text below select |
| `fullWidth` | `boolean` | `true` | Make select full width |
| `mode` | `'multiple' \| 'tags'` | - | Multi-select mode |
| `showSearch` | `boolean` | `false` | Enable search |
| `options` | `{ value, label }[]` | - | Select options |

### Spinner

Wraps `antd/Spin` with fullscreen support.

```typescript
import { Spinner } from '@components/ui/Spinner/Spinner';

// Inline spinner
<Spinner size="sm" />

// Full screen loading overlay
<Spinner fullScreen />
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Spinner size |
| `fullScreen` | `boolean` | `false` | Show as fullscreen overlay |
| `tip` | `string` | - | Loading text |

### Table

Wraps `antd/Table` with compact and striped options.

```typescript
import { Table } from '@components/ui/Table/Table';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
];
const data = [
  { key: '1', name: 'John', age: 32 },
  { key: '2', name: 'Jane', age: 28 },
];

// Basic table
<Table columns={columns} dataSource={data} />

// Compact table
<Table compact columns={columns} dataSource={data} />

// Striped rows
<Table striped columns={columns} dataSource={data} />

// With pagination
<Table
  columns={columns}
  dataSource={data}
  pagination={{ pageSize: 10 }}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `compact` | `boolean` | `false` | Compact layout with reduced padding |
| `striped` | `boolean` | `false` | Striped rows for readability |
| `columns` | `ColumnType[]` | - | Table column definitions |
| `dataSource` | `T[]` | - | Table data array |
| `pagination` | `object \| false` | - | Pagination config |
| `loading` | `boolean` | `false` | Show loading state |

---

## Creating New Components

### Step 1: Create folder structure

```
src/components/ui/ComponentName/
├── ComponentName.tsx
├── ComponentName.module.scss
├── ComponentName.stories.tsx
└── ComponentName.test.tsx
```

### Step 2: Component implementation template

```typescript
// ComponentName.tsx
import { forwardRef } from 'react';
import { AntdComponent } from 'antd';
import type { AntdComponentProps } from 'antd';
import styles from './ComponentName.module.scss';

// Extend antd props with custom props
export interface ComponentNameProps extends AntdComponentProps {
  /** Custom prop description */
  customProp?: boolean;
}

/**
 * ComponentName description.
 *
 * @example
 * <ComponentName customProp>Content</ComponentName>
 */
export const ComponentName = forwardRef<HTMLElement, ComponentNameProps>(
  ({ customProp, className, ...props }, ref) => {
    const classNames = [
      styles.component,
      customProp && styles['component--custom'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <AntdComponent
        ref={ref}
        className={classNames}
        {...props}
      />
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

### Step 3: SCSS module

```scss
// ComponentName.module.scss
.component {
  // Base styles (optional overrides)

  &--custom {
    // Custom prop styles
  }
}
```

### Step 4: Storybook stories

```typescript
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'UI/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    customProp: {
      control: 'boolean',
      description: 'Custom prop description',
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default content',
  },
};
```

### Step 5: Unit tests

```typescript
// ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { ComponentName } from './ComponentName';
import { lightTheme } from '@lib/antd/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ConfigProvider theme={lightTheme}>
      {ui}
    </ConfigProvider>
  );
};

describe('ComponentName', () => {
  it('renders correctly', () => {
    renderWithTheme(<ComponentName>Content</ComponentName>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
```

---

## SCSS Integration

Components can use SCSS modules for custom styling. Global SCSS abstracts are auto-imported via Vite.

```scss
// In Component.module.scss
.customStyle {
  // Use CSS custom properties for theme-aware values
  color: var(--color-text-primary);
  background: var(--color-bg-secondary);

  // Use SCSS variables for static values
  border-radius: $border-radius-md;
  padding: $spacing-md;

  // Use responsive mixins
  @include media-up('md') {
    padding: $spacing-lg;
  }
}
```

---

## Storybook

Run Storybook to view component documentation:

```bash
npm run storybook
```

Build Storybook for deployment:

```bash
npm run build-storybook
```

Stories include:
- Interactive controls for all props
- Usage examples
- Accessibility information
- Responsive previews via viewport addon
