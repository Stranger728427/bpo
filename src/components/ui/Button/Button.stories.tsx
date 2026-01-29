import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Button component built on Ant Design Button.

## Features
- All Ant Design Button props supported
- Custom \`fullWidth\` prop for block-level buttons
- Theme-aware via ConfigProvider

## Usage
\`\`\`tsx
import { Button } from '@components/ui/Button/Button';

<Button type="primary" onClick={handleClick}>
  Click me
</Button>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'default', 'dashed', 'text', 'link'],
      description: 'Button type (from Ant Design)',
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
      description: 'Button size',
    },
    danger: {
      control: 'boolean',
      description: 'Enable danger state',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width (custom prop)',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    type: 'primary',
  },
};

export const Default: Story = {
  args: {
    children: 'Default Button',
    type: 'default',
  },
};

export const Dashed: Story = {
  args: {
    children: 'Dashed Button',
    type: 'dashed',
  },
};

export const Text: Story = {
  args: {
    children: 'Text Button',
    type: 'text',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    type: 'link',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    type: 'primary',
    danger: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    type: 'primary',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    type: 'primary',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    type: 'primary',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="small" type="primary">
        Small
      </Button>
      <Button size="middle" type="primary">
        Medium
      </Button>
      <Button size="large" type="primary">
        Large
      </Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button type="primary">Primary</Button>
      <Button type="default">Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <Button type="link">Link</Button>
      <Button type="primary" danger>
        Danger
      </Button>
    </div>
  ),
};
