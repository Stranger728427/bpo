import type { Meta, StoryObj } from '@storybook/react';
import { SearchOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input } from './Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Input component built on Ant Design Input.

## Features
- Label, error, and helper text support
- All Ant Design Input props (prefix, suffix, allowClear, etc.)
- Full width by default
- Accessible with proper ARIA attributes

## Usage
\`\`\`tsx
import { Input } from '@components/ui/Input/Input';

<Input
  label="Email"
  placeholder="Enter your email"
  error={errors.email}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label above the input',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make input full width',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    helperText: 'This will be your public display name',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
};

export const WithPrefix: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    prefix: <UserOutlined />,
  },
};

export const WithSuffix: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    suffix: <SearchOutlined />,
  },
};

export const Password: Story = {
  render: () => (
    <Input
      label="Password"
      placeholder="Enter password"
      type="password"
      prefix={<LockOutlined />}
    />
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};

export const AllowClear: Story = {
  args: {
    label: 'Clearable',
    placeholder: 'Type something...',
    allowClear: true,
    defaultValue: 'Clear me!',
  },
};

export const FormExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input
        label="Full Name"
        placeholder="John Doe"
        prefix={<UserOutlined />}
      />
      <Input
        label="Email"
        placeholder="john@example.com"
        type="email"
      />
      <Input
        label="Password"
        placeholder="Enter password"
        type="password"
        prefix={<LockOutlined />}
        helperText="Must be at least 8 characters"
      />
    </div>
  ),
};
