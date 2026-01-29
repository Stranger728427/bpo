import type { Meta, StoryObj } from '@storybook/react';
import { BodyWrapper } from './BodyWrapper';
import { LayoutProvider } from '../LayoutContext';
import { Sidebar } from '../Sidebar/Sidebar';
import { MainContent } from '../MainContent/MainContent';

const meta = {
  title: 'Layout/BodyWrapper',
  component: BodyWrapper,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
BodyWrapper component that contains the Sidebar and MainContent.

## Features
- Flex container for sidebar and main content
- Handles the layout below the header
- Provides proper spacing and overflow handling

## Usage
\`\`\`tsx
import { BodyWrapper } from '@components/layout/BodyWrapper/BodyWrapper';
import { Sidebar } from '@components/layout/Sidebar/Sidebar';
import { MainContent } from '@components/layout/MainContent/MainContent';

<BodyWrapper>
  <Sidebar>Navigation</Sidebar>
  <MainContent>Page content</MainContent>
</BodyWrapper>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <LayoutProvider defaultExpanded={true}>
        <div style={{ height: '400px' }}>
          <Story />
        </div>
      </LayoutProvider>
    ),
  ],
} satisfies Meta<typeof BodyWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleSidebarContent = () => (
  <div style={{ padding: '1rem' }}>
    {['Home', 'About', 'Services', 'Contact'].map((item) => (
      <div key={item} style={{ padding: '0.5rem 0', cursor: 'pointer' }}>
        {item}
      </div>
    ))}
  </div>
);

const SampleMainContent = () => (
  <div style={{ padding: '2rem' }}>
    <h1>Page Title</h1>
    <p>This is the main content area that sits alongside the sidebar.</p>
  </div>
);

export const Default: Story = {
  args: {
    children: (
      <>
        <Sidebar>
          <SampleSidebarContent />
        </Sidebar>
        <MainContent>
          <SampleMainContent />
        </MainContent>
      </>
    ),
  },
};

export const WithCollapsedSidebar: Story = {
  decorators: [
    (Story) => (
      <LayoutProvider defaultExpanded={false}>
        <div style={{ height: '400px' }}>
          <Story />
        </div>
      </LayoutProvider>
    ),
  ],
  args: {
    children: (
      <>
        <Sidebar>
          <SampleSidebarContent />
        </Sidebar>
        <MainContent>
          <SampleMainContent />
        </MainContent>
      </>
    ),
  },
};

export const ContentOnly: Story = {
  args: {
    children: (
      <div style={{ padding: '2rem', width: '100%' }}>
        <h1>Full Width Content</h1>
        <p>This example shows BodyWrapper with only content, no sidebar.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                padding: '1.5rem',
                background: '#f5f5f5',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              Card {i}
            </div>
          ))}
        </div>
      </div>
    ),
  },
};
