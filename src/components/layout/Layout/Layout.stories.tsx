import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { BodyWrapper } from '../BodyWrapper/BodyWrapper';
import { MainContent } from '../MainContent/MainContent';
import { Button } from '../../ui/Button/Button';

const meta = {
  title: 'Layout/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Layout component that provides the main structure for the application.

## Features
- Provides LayoutContext for sidebar state management
- Controls sidebar expanded/collapsed state
- Wraps all layout child components

## Usage
\`\`\`tsx
import { Layout } from '@components/layout/Layout/Layout';
import { Header } from '@components/layout/Header/Header';
import { Sidebar } from '@components/layout/Sidebar/Sidebar';
import { BodyWrapper } from '@components/layout/BodyWrapper/BodyWrapper';
import { MainContent } from '@components/layout/MainContent/MainContent';

<Layout defaultSidebarExpanded={true}>
  <Header>Header content</Header>
  <BodyWrapper>
    <Sidebar>Sidebar content</Sidebar>
    <MainContent>Main content</MainContent>
  </BodyWrapper>
</Layout>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultSidebarExpanded: {
      control: 'boolean',
      description: 'Initial sidebar expanded state',
    },
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleNavItems = () => (
  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <div style={{ padding: '0.5rem', cursor: 'pointer' }}>Dashboard</div>
    <div style={{ padding: '0.5rem', cursor: 'pointer' }}>Campaigns</div>
    <div style={{ padding: '0.5rem', cursor: 'pointer' }}>Call Logs</div>
    <div style={{ padding: '0.5rem', cursor: 'pointer' }}>Lead List</div>
    <div style={{ padding: '0.5rem', cursor: 'pointer' }}>AI Studio</div>
  </div>
);

const SampleContent = () => (
  <div style={{ padding: '2rem' }}>
    <h1>Welcome to Dashboard</h1>
    <p>This is the main content area. It adjusts based on sidebar state.</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            padding: '1.5rem',
            background: 'var(--color-bg-secondary, #f5f5f5)',
            borderRadius: '8px',
          }}
        >
          Card {i}
        </div>
      ))}
    </div>
  </div>
);

export const Default: Story = {
  args: {
    defaultSidebarExpanded: false,
  },
  render: (args) => (
    <Layout {...args}>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 1rem' }}>
          <span style={{ fontWeight: 'bold' }}>MyAI</span>
          <Button type="primary" size="small">Profile</Button>
        </div>
      </Header>
      <BodyWrapper>
        <Sidebar>
          <SampleNavItems />
        </Sidebar>
        <MainContent>
          <SampleContent />
        </MainContent>
      </BodyWrapper>
    </Layout>
  ),
};

export const SidebarExpanded: Story = {
  args: {
    defaultSidebarExpanded: true,
  },
  render: (args) => (
    <Layout {...args}>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 1rem' }}>
          <span style={{ fontWeight: 'bold' }}>MyAI</span>
          <Button type="primary" size="small">Profile</Button>
        </div>
      </Header>
      <BodyWrapper>
        <Sidebar>
          <SampleNavItems />
        </Sidebar>
        <MainContent>
          <SampleContent />
        </MainContent>
      </BodyWrapper>
    </Layout>
  ),
};

export const SidebarCollapsed: Story = {
  args: {
    defaultSidebarExpanded: false,
  },
  render: (args) => (
    <Layout {...args}>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 1rem' }}>
          <span style={{ fontWeight: 'bold' }}>MyAI</span>
          <Button type="primary" size="small">Profile</Button>
        </div>
      </Header>
      <BodyWrapper>
        <Sidebar>
          <SampleNavItems />
        </Sidebar>
        <MainContent>
          <SampleContent />
        </MainContent>
      </BodyWrapper>
    </Layout>
  ),
};
