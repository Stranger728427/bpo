import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Card component built on Ant Design Card.

## Features
- Three visual variants: elevated, outlined, filled
- Configurable padding sizes
- Hoverable state with animation
- Support for title, extra actions, and cover images

## Usage
\`\`\`tsx
import { Card } from '@components/ui/Card/Card';

<Card title="Card Title" variant="elevated">
  Card content here
</Card>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Card visual style',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Internal padding',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effect',
    },
    title: {
      control: 'text',
      description: 'Card header title',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is the card content. You can put any content here.',
    style: { width: 300 },
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'This is the card content with a title.',
    style: { width: 300 },
  },
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Card',
    variant: 'elevated',
    children: 'This card has a shadow effect.',
    style: { width: 300 },
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined Card',
    variant: 'outlined',
    children: 'This card has a border.',
    style: { width: 300 },
  },
};

export const Filled: Story = {
  args: {
    title: 'Filled Card',
    variant: 'filled',
    children: 'This card has a filled background.',
    style: { width: 300 },
  },
};

export const Hoverable: Story = {
  args: {
    title: 'Hoverable Card',
    hoverable: true,
    children: 'Hover over this card to see the effect.',
    style: { width: 300 },
  },
};

export const WithExtra: Story = {
  args: {
    title: 'Card with Actions',
    extra: <Button type="link">More</Button>,
    children: 'This card has extra content in the header.',
    style: { width: 300 },
  },
};

export const PaddingSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Card title="No Padding" padding="none" style={{ width: 200 }}>
        padding: none
      </Card>
      <Card title="Small Padding" padding="sm" style={{ width: 200 }}>
        padding: sm
      </Card>
      <Card title="Medium Padding" padding="md" style={{ width: 200 }}>
        padding: md
      </Card>
      <Card title="Large Padding" padding="lg" style={{ width: 200 }}>
        padding: lg
      </Card>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Card title="Elevated" variant="elevated" style={{ width: 200 }}>
        Elevated card
      </Card>
      <Card title="Outlined" variant="outlined" style={{ width: 200 }}>
        Outlined card
      </Card>
      <Card title="Filled" variant="filled" style={{ width: 200 }}>
        Filled card
      </Card>
    </div>
  ),
};
