import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'UI/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Spinner component built on Ant Design Spin.

## Features
- Three size options: sm, md, lg
- Fullscreen overlay mode
- Optional loading text via \`tip\` prop
- Theme-aware styling

## Usage
\`\`\`tsx
import { Spinner } from '@components/ui/Spinner/Spinner';

<Spinner size="md" />
<Spinner fullScreen />
<Spinner tip="Loading..." />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spinner size',
    },
    fullScreen: {
      control: 'boolean',
      description: 'Show as fullscreen overlay',
    },
    tip: {
      control: 'text',
      description: 'Loading text to display',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const WithTip: Story = {
  args: {
    size: 'md',
    tip: 'Loading...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const FullScreen: Story = {
  args: {
    fullScreen: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};
