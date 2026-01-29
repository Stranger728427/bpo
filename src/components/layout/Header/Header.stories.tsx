import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { Button } from '../../ui/Button/Button';
import { Avatar } from '../../ui/Avatar/Avatar';
import { Input } from '../../ui/Input/Input';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Header component for the top navigation area.

## Features
- Fixed position at the top of the page
- Flexible content area for logo, navigation, and actions
- Consistent styling across the application

## Usage
\`\`\`tsx
import { Header } from '@components/layout/Header/Header';

<Header>
  <Logo />
  <Navigation />
  <UserActions />
</Header>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 1rem' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>MyAI</span>
        <Button type="primary">Action</Button>
      </div>
    ),
  },
};

export const WithNavigation: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>MyAI</span>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Dashboard</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Campaigns</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Reports</a>
          </nav>
        </div>
        <Button type="primary">Sign In</Button>
      </div>
    ),
  },
};

export const WithSearch: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 1rem', gap: '1rem' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>MyAI</span>
        <div style={{ flex: 1, maxWidth: '400px' }}>
          <Input placeholder="Search..." fullWidth />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Button>Notifications</Button>
          <Avatar>JD</Avatar>
        </div>
      </div>
    ),
  },
};

export const WithUserProfile: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>MyAI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Button type="text">Help</Button>
          <Button type="text">Settings</Button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Avatar status="online" showStatus>JD</Avatar>
            <span>John Doe</span>
          </div>
        </div>
      </div>
    ),
  },
};

export const Minimal: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>MyAI</span>
      </div>
    ),
  },
};
