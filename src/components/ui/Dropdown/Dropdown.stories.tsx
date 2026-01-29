import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { Button } from '../Button/Button';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
} from '@ant-design/icons';

const meta = {
  title: 'UI/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2' },
  { key: '3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    items: basicItems,
    children: (
      <Button>
        Dropdown <DownOutlined />
      </Button>
    ),
  },
};

const itemsWithIcons = [
  {
    key: '1',
    label: 'Profile',
    icon: <UserOutlined />,
  },
  {
    key: '2',
    label: 'Settings',
    icon: <SettingOutlined />,
  },
  {
    type: 'divider' as const,
  },
  {
    key: '3',
    label: 'Logout',
    icon: <LogoutOutlined />,
  },
];

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
    children: (
      <Button>
        Account <DownOutlined />
      </Button>
    ),
  },
};

const actionItems = [
  {
    key: '1',
    label: 'Edit',
    icon: <EditOutlined />,
  },
  {
    key: '2',
    label: 'Delete',
    icon: <DeleteOutlined />,
    danger: true,
  },
];

export const WithDangerItem: Story = {
  args: {
    items: actionItems,
    children: (
      <Button>
        Actions <DownOutlined />
      </Button>
    ),
  },
};

const groupedItems = [
  {
    type: 'group' as const,
    label: 'Group 1',
    children: [
      { key: '1-1', label: 'Option 1-1' },
      { key: '1-2', label: 'Option 1-2' },
    ],
  },
  {
    type: 'group' as const,
    label: 'Group 2',
    children: [
      { key: '2-1', label: 'Option 2-1' },
      { key: '2-2', label: 'Option 2-2' },
    ],
  },
];

export const Grouped: Story = {
  args: {
    items: groupedItems,
    children: (
      <Button>
        Grouped Menu <DownOutlined />
      </Button>
    ),
  },
};

export const TriggerHover: Story = {
  args: {
    items: basicItems,
    trigger: ['hover'],
    children: <Button>Hover me</Button>,
  },
};

export const PlacementBottom: Story = {
  args: {
    items: basicItems,
    placement: 'bottom',
    children: <Button>Bottom Placement</Button>,
  },
};

export const PlacementTop: Story = {
  args: {
    items: basicItems,
    placement: 'top',
    children: <Button>Top Placement</Button>,
  },
};

const disabledItems = [
  { key: '1', label: 'Enabled Option' },
  { key: '2', label: 'Disabled Option', disabled: true },
  { key: '3', label: 'Another Enabled Option' },
];

export const WithDisabledItems: Story = {
  args: {
    items: disabledItems,
    children: (
      <Button>
        Menu <DownOutlined />
      </Button>
    ),
  },
};
