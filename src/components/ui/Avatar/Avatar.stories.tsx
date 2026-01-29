import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { UserOutlined } from '@ant-design/icons';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'JD',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    alt: 'User Avatar',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <UserOutlined />,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'JD',
  },
};

export const Default_: Story = {
  args: {
    size: 'default',
    children: 'JD',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'JD',
  },
};

export const CustomSize: Story = {
  args: {
    size: 64,
    children: 'JD',
  },
};

export const Square: Story = {
  args: {
    shape: 'square',
    children: 'JD',
  },
};

export const WithOnlineStatus: Story = {
  args: {
    children: 'JD',
    status: 'online',
    showStatus: true,
    size: 64,
  },
};

export const WithOfflineStatus: Story = {
  args: {
    children: 'JD',
    status: 'offline',
    showStatus: true,
    size: 64,
  },
};

export const WithAwayStatus: Story = {
  args: {
    children: 'JD',
    status: 'away',
    showStatus: true,
    size: 64,
  },
};

export const WithBusyStatus: Story = {
  args: {
    children: 'JD',
    status: 'busy',
    showStatus: true,
    size: 64,
  },
};

export const Group: Story = {
  render: () => (
    <Avatar.Group maxCount={3}>
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie" />
    </Avatar.Group>
  ),
};

export const GroupWithText: Story = {
  render: () => (
    <Avatar.Group>
      <Avatar>JD</Avatar>
      <Avatar>JS</Avatar>
      <Avatar>AB</Avatar>
      <Avatar>CD</Avatar>
    </Avatar.Group>
  ),
};

export const ColoredBackground: Story = {
  args: {
    children: 'JD',
    style: { backgroundColor: '#87d068' },
    size: 64,
  },
};
