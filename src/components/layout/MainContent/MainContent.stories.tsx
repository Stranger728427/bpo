import type { Meta, StoryObj } from '@storybook/react';
import { MainContent } from './MainContent';
import { LayoutProvider } from '../LayoutContext';
import { Card } from '../../ui/Card/Card';
import { Button } from '../../ui/Button/Button';

const meta = {
  title: 'Layout/MainContent',
  component: MainContent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
MainContent component for the primary content area.

## Features
- Responsive to sidebar expanded/collapsed state
- Smooth width transitions
- Scrollable content area
- Proper spacing and padding

## Usage
\`\`\`tsx
import { MainContent } from '@components/layout/MainContent/MainContent';
import { Layout } from '@components/layout/Layout/Layout';

// Must be used within Layout (which provides LayoutContext)
<Layout>
  <BodyWrapper>
    <Sidebar>...</Sidebar>
    <MainContent>
      <PageContent />
    </MainContent>
  </BodyWrapper>
</Layout>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <LayoutProvider defaultExpanded={false}>
        <div style={{ height: '500px', display: 'flex' }}>
          <Story />
        </div>
      </LayoutProvider>
    ),
  ],
} satisfies Meta<typeof MainContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '2rem' }}>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard. This is the main content area.</p>
      </div>
    ),
  },
};

export const WithSidebarExpanded: Story = {
  decorators: [
    (Story) => (
      <LayoutProvider defaultExpanded={true}>
        <div style={{ height: '500px', display: 'flex' }}>
          <div style={{ width: '240px', background: '#f5f5f5', flexShrink: 0 }}>
            <div style={{ padding: '1rem' }}>Sidebar (expanded)</div>
          </div>
          <Story />
        </div>
      </LayoutProvider>
    ),
  ],
  args: {
    children: (
      <div style={{ padding: '2rem' }}>
        <h1>Dashboard</h1>
        <p>The main content adjusts when sidebar is expanded.</p>
      </div>
    ),
  },
};

export const WithSidebarCollapsed: Story = {
  decorators: [
    (Story) => (
      <LayoutProvider defaultExpanded={false}>
        <div style={{ height: '500px', display: 'flex' }}>
          <div style={{ width: '64px', background: '#f5f5f5', flexShrink: 0 }}>
            <div style={{ padding: '1rem', fontSize: '0.75rem' }}>Nav</div>
          </div>
          <Story />
        </div>
      </LayoutProvider>
    ),
  ],
  args: {
    children: (
      <div style={{ padding: '2rem' }}>
        <h1>Dashboard</h1>
        <p>The main content has more space when sidebar is collapsed.</p>
      </div>
    ),
  },
};

export const WithCards: Story = {
  args: {
    children: (
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <Button type="primary">Add New</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          <Card title="Total Users" variant="elevated">
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>1,234</div>
            <div style={{ color: '#22c55e', fontSize: '0.875rem' }}>+12% from last month</div>
          </Card>
          <Card title="Revenue" variant="elevated">
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>$45,678</div>
            <div style={{ color: '#22c55e', fontSize: '0.875rem' }}>+8% from last month</div>
          </Card>
          <Card title="Active Campaigns" variant="elevated">
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>23</div>
            <div style={{ color: '#f59e0b', fontSize: '0.875rem' }}>3 pending approval</div>
          </Card>
          <Card title="Conversion Rate" variant="elevated">
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>3.2%</div>
            <div style={{ color: '#ef4444', fontSize: '0.875rem' }}>-0.5% from last month</div>
          </Card>
        </div>
      </div>
    ),
  },
};

export const WithTable: Story = {
  args: {
    children: (
      <div style={{ padding: '2rem' }}>
        <h1>Recent Activity</h1>
        <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e5e5' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>Name</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>Date</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Campaign A', status: 'Active', date: '2024-01-15' },
                { name: 'Campaign B', status: 'Paused', date: '2024-01-14' },
                { name: 'Campaign C', status: 'Completed', date: '2024-01-13' },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e5e5e5' }}>{row.name}</td>
                  <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e5e5e5' }}>{row.status}</td>
                  <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e5e5e5' }}>{row.date}</td>
                  <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e5e5e5' }}>
                    <Button type="link" size="small">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
};

export const ScrollableContent: Story = {
  args: {
    children: (
      <div style={{ padding: '2rem' }}>
        <h1>Long Content Page</h1>
        {Array.from({ length: 20 }).map((_, i) => (
          <Card key={i} title={`Section ${i + 1}`} variant="outlined" style={{ marginBottom: '1rem' }}>
            <p>
              This is section {i + 1} of the page. MainContent handles scrolling for long content
              while keeping the sidebar fixed.
            </p>
          </Card>
        ))}
      </div>
    ),
  },
};
