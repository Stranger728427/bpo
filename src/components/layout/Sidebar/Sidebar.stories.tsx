import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { LayoutProvider } from '../LayoutContext';
import { Button } from '../../ui/Button/Button';

const meta = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Sidebar component for navigation.

## Features
- Expandable/collapsible state controlled by LayoutContext
- Responsive width transitions
- Navigation container with scroll support

## Usage
\`\`\`tsx
import { Sidebar } from '@components/layout/Sidebar/Sidebar';
import { Layout } from '@components/layout/Layout/Layout';

// Must be used within Layout (which provides LayoutContext)
<Layout>
  <Sidebar>
    <NavItem>Dashboard</NavItem>
    <NavItem>Settings</NavItem>
  </Sidebar>
</Layout>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <LayoutProvider defaultExpanded={context.args.expanded ?? false}>
        <div style={{ height: '400px', display: 'flex' }}>
          <Story />
        </div>
      </LayoutProvider>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const NavItems = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0.5rem' }}>
    {['Dashboard', 'Campaigns', 'Call Logs', 'Lead List', 'AI Studio', 'Settings'].map((item) => (
      <div
        key={item}
        style={{
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        {item}
      </div>
    ))}
  </div>
);

const IconNavItems = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0.5rem' }}>
    {[
      { icon: '📊', label: 'Dashboard' },
      { icon: '📢', label: 'Campaigns' },
      { icon: '📞', label: 'Call Logs' },
      { icon: '👥', label: 'Lead List' },
      { icon: '🤖', label: 'AI Studio' },
      { icon: '⚙️', label: 'Settings' },
    ].map((item) => (
      <div
        key={item.label}
        style={{
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <span>{item.icon}</span>
        <span>{item.label}</span>
      </div>
    ))}
  </div>
);

export const Collapsed: Story = {
  args: {
    expanded: false,
  } as { expanded?: boolean },
  render: () => (
    <Sidebar>
      <NavItems />
    </Sidebar>
  ),
};

export const Expanded: Story = {
  args: {
    expanded: true,
  } as { expanded?: boolean },
  decorators: [
    (Story) => (
      <LayoutProvider defaultExpanded={true}>
        <div style={{ height: '400px', display: 'flex' }}>
          <Story />
        </div>
      </LayoutProvider>
    ),
  ],
  render: () => (
    <Sidebar>
      <NavItems />
    </Sidebar>
  ),
};

export const WithIcons: Story = {
  args: {
    expanded: true,
  } as { expanded?: boolean },
  decorators: [
    (Story) => (
      <LayoutProvider defaultExpanded={true}>
        <div style={{ height: '400px', display: 'flex' }}>
          <Story />
        </div>
      </LayoutProvider>
    ),
  ],
  render: () => (
    <Sidebar>
      <IconNavItems />
    </Sidebar>
  ),
};

export const WithFooter: Story = {
  args: {
    expanded: true,
  } as { expanded?: boolean },
  decorators: [
    (Story) => (
      <LayoutProvider defaultExpanded={true}>
        <div style={{ height: '400px', display: 'flex' }}>
          <Story />
        </div>
      </LayoutProvider>
    ),
  ],
  render: () => (
    <Sidebar>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <IconNavItems />
        <div style={{ padding: '1rem', borderTop: '1px solid #e5e5e5' }}>
          <Button type="primary" fullWidth>
            Upgrade Plan
          </Button>
        </div>
      </div>
    </Sidebar>
  ),
};
