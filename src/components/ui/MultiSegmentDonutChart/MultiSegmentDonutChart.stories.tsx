import type { Meta, StoryObj } from '@storybook/react';
import { MultiSegmentDonutChart } from './MultiSegmentDonutChart';

const meta: Meta<typeof MultiSegmentDonutChart> = {
  title: 'UI/MultiSegmentDonutChart',
  component: MultiSegmentDonutChart,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', padding: '20px', background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MultiSegmentDonutChart>;

const callOutcomesData = [
  { name: 'Connected', value: 42, color: '#8b5cf6' },
  { name: 'No Answer', value: 35, color: '#c4b5fd' },
  { name: 'Busy / Failed', value: 23, color: '#6b7280' },
];

export const Default: Story = {
  args: {
    data: callOutcomesData,
    size: 220,
    innerRadius: 65,
    outerRadius: 90,
    showLegend: true,
    showPercentage: true,
  },
};

export const LargeSize: Story = {
  args: {
    data: callOutcomesData,
    size: 300,
    innerRadius: 90,
    outerRadius: 120,
    showLegend: true,
    showPercentage: true,
  },
};

export const WithoutLegend: Story = {
  args: {
    data: callOutcomesData,
    size: 200,
    innerRadius: 60,
    outerRadius: 85,
    showLegend: false,
    showPercentage: true,
  },
};

export const WithoutPercentage: Story = {
  args: {
    data: callOutcomesData,
    size: 200,
    innerRadius: 60,
    outerRadius: 85,
    showLegend: true,
    showPercentage: false,
  },
};

export const FourSegments: Story = {
  args: {
    data: [
      { name: 'Success', value: 45, color: '#22c55e' },
      { name: 'Warning', value: 25, color: '#f59e0b' },
      { name: 'Error', value: 15, color: '#ef4444' },
      { name: 'Pending', value: 15, color: '#6b7280' },
    ],
    size: 220,
    innerRadius: 65,
    outerRadius: 90,
    showLegend: true,
    showPercentage: true,
  },
};

export const TwoSegments: Story = {
  args: {
    data: [
      { name: 'Completed', value: 68, color: '#8b5cf6' },
      { name: 'Remaining', value: 32, color: '#e5e7eb' },
    ],
    size: 180,
    innerRadius: 55,
    outerRadius: 75,
    showLegend: true,
    showPercentage: true,
  },
};
